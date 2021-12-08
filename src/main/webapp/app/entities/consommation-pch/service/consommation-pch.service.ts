import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConsommationPch, getConsommationPchIdentifier } from '../consommation-pch.model';

export type EntityResponseType = HttpResponse<IConsommationPch>;
export type EntityArrayResponseType = HttpResponse<IConsommationPch[]>;

@Injectable({ providedIn: 'root' })
export class ConsommationPchService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/consommation-pches');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(consommationPch: IConsommationPch): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consommationPch);
    return this.http
      .post<IConsommationPch>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(consommationPch: IConsommationPch): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consommationPch);
    return this.http
      .put<IConsommationPch>(`${this.resourceUrl}/${getConsommationPchIdentifier(consommationPch) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(consommationPch: IConsommationPch): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consommationPch);
    return this.http
      .patch<IConsommationPch>(`${this.resourceUrl}/${getConsommationPchIdentifier(consommationPch) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IConsommationPch>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConsommationPch[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addConsommationPchToCollectionIfMissing(
    consommationPchCollection: IConsommationPch[],
    ...consommationPchesToCheck: (IConsommationPch | null | undefined)[]
  ): IConsommationPch[] {
    const consommationPches: IConsommationPch[] = consommationPchesToCheck.filter(isPresent);
    if (consommationPches.length > 0) {
      const consommationPchCollectionIdentifiers = consommationPchCollection.map(
        consommationPchItem => getConsommationPchIdentifier(consommationPchItem)!
      );
      const consommationPchesToAdd = consommationPches.filter(consommationPchItem => {
        const consommationPchIdentifier = getConsommationPchIdentifier(consommationPchItem);
        if (consommationPchIdentifier == null || consommationPchCollectionIdentifiers.includes(consommationPchIdentifier)) {
          return false;
        }
        consommationPchCollectionIdentifiers.push(consommationPchIdentifier);
        return true;
      });
      return [...consommationPchesToAdd, ...consommationPchCollection];
    }
    return consommationPchCollection;
  }

  protected convertDateFromClient(consommationPch: IConsommationPch): IConsommationPch {
    return Object.assign({}, consommationPch, {
      date: consommationPch.date?.isValid() ? consommationPch.date.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? dayjs(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((consommationPch: IConsommationPch) => {
        consommationPch.date = consommationPch.date ? dayjs(consommationPch.date) : undefined;
      });
    }
    return res;
  }
}
