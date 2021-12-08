import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConsommationPchE, getConsommationPchEIdentifier } from '../consommation-pch-e.model';

export type EntityResponseType = HttpResponse<IConsommationPchE>;
export type EntityArrayResponseType = HttpResponse<IConsommationPchE[]>;

@Injectable({ providedIn: 'root' })
export class ConsommationPchEService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/consommation-pch-es');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(consommationPchE: IConsommationPchE): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consommationPchE);
    return this.http
      .post<IConsommationPchE>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(consommationPchE: IConsommationPchE): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consommationPchE);
    return this.http
      .put<IConsommationPchE>(`${this.resourceUrl}/${getConsommationPchEIdentifier(consommationPchE) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(consommationPchE: IConsommationPchE): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consommationPchE);
    return this.http
      .patch<IConsommationPchE>(`${this.resourceUrl}/${getConsommationPchEIdentifier(consommationPchE) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IConsommationPchE>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConsommationPchE[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addConsommationPchEToCollectionIfMissing(
    consommationPchECollection: IConsommationPchE[],
    ...consommationPchESToCheck: (IConsommationPchE | null | undefined)[]
  ): IConsommationPchE[] {
    const consommationPchES: IConsommationPchE[] = consommationPchESToCheck.filter(isPresent);
    if (consommationPchES.length > 0) {
      const consommationPchECollectionIdentifiers = consommationPchECollection.map(
        consommationPchEItem => getConsommationPchEIdentifier(consommationPchEItem)!
      );
      const consommationPchESToAdd = consommationPchES.filter(consommationPchEItem => {
        const consommationPchEIdentifier = getConsommationPchEIdentifier(consommationPchEItem);
        if (consommationPchEIdentifier == null || consommationPchECollectionIdentifiers.includes(consommationPchEIdentifier)) {
          return false;
        }
        consommationPchECollectionIdentifiers.push(consommationPchEIdentifier);
        return true;
      });
      return [...consommationPchESToAdd, ...consommationPchECollection];
    }
    return consommationPchECollection;
  }

  protected convertDateFromClient(consommationPchE: IConsommationPchE): IConsommationPchE {
    return Object.assign({}, consommationPchE, {
      date: consommationPchE.date?.isValid() ? consommationPchE.date.toJSON() : undefined,
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
      res.body.forEach((consommationPchE: IConsommationPchE) => {
        consommationPchE.date = consommationPchE.date ? dayjs(consommationPchE.date) : undefined;
      });
    }
    return res;
  }
}
