import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConsommationCi, getConsommationCiIdentifier } from '../consommation-ci.model';

export type EntityResponseType = HttpResponse<IConsommationCi>;
export type EntityArrayResponseType = HttpResponse<IConsommationCi[]>;

@Injectable({ providedIn: 'root' })
export class ConsommationCiService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/consommation-cis');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(consommationCi: IConsommationCi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consommationCi);
    return this.http
      .post<IConsommationCi>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(consommationCi: IConsommationCi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consommationCi);
    return this.http
      .put<IConsommationCi>(`${this.resourceUrl}/${getConsommationCiIdentifier(consommationCi) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(consommationCi: IConsommationCi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consommationCi);
    return this.http
      .patch<IConsommationCi>(`${this.resourceUrl}/${getConsommationCiIdentifier(consommationCi) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IConsommationCi>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConsommationCi[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addConsommationCiToCollectionIfMissing(
    consommationCiCollection: IConsommationCi[],
    ...consommationCisToCheck: (IConsommationCi | null | undefined)[]
  ): IConsommationCi[] {
    const consommationCis: IConsommationCi[] = consommationCisToCheck.filter(isPresent);
    if (consommationCis.length > 0) {
      const consommationCiCollectionIdentifiers = consommationCiCollection.map(
        consommationCiItem => getConsommationCiIdentifier(consommationCiItem)!
      );
      const consommationCisToAdd = consommationCis.filter(consommationCiItem => {
        const consommationCiIdentifier = getConsommationCiIdentifier(consommationCiItem);
        if (consommationCiIdentifier == null || consommationCiCollectionIdentifiers.includes(consommationCiIdentifier)) {
          return false;
        }
        consommationCiCollectionIdentifiers.push(consommationCiIdentifier);
        return true;
      });
      return [...consommationCisToAdd, ...consommationCiCollection];
    }
    return consommationCiCollection;
  }

  protected convertDateFromClient(consommationCi: IConsommationCi): IConsommationCi {
    return Object.assign({}, consommationCi, {
      date: consommationCi.date?.isValid() ? consommationCi.date.toJSON() : undefined,
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
      res.body.forEach((consommationCi: IConsommationCi) => {
        consommationCi.date = consommationCi.date ? dayjs(consommationCi.date) : undefined;
      });
    }
    return res;
  }
}
