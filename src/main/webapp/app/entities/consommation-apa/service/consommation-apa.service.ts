import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConsommationApa, getConsommationApaIdentifier } from '../consommation-apa.model';

export type EntityResponseType = HttpResponse<IConsommationApa>;
export type EntityArrayResponseType = HttpResponse<IConsommationApa[]>;

@Injectable({ providedIn: 'root' })
export class ConsommationApaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/consommation-apas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(consommationApa: IConsommationApa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consommationApa);
    return this.http
      .post<IConsommationApa>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(consommationApa: IConsommationApa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consommationApa);
    return this.http
      .put<IConsommationApa>(`${this.resourceUrl}/${getConsommationApaIdentifier(consommationApa) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(consommationApa: IConsommationApa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consommationApa);
    return this.http
      .patch<IConsommationApa>(`${this.resourceUrl}/${getConsommationApaIdentifier(consommationApa) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IConsommationApa>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConsommationApa[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addConsommationApaToCollectionIfMissing(
    consommationApaCollection: IConsommationApa[],
    ...consommationApasToCheck: (IConsommationApa | null | undefined)[]
  ): IConsommationApa[] {
    const consommationApas: IConsommationApa[] = consommationApasToCheck.filter(isPresent);
    if (consommationApas.length > 0) {
      const consommationApaCollectionIdentifiers = consommationApaCollection.map(
        consommationApaItem => getConsommationApaIdentifier(consommationApaItem)!
      );
      const consommationApasToAdd = consommationApas.filter(consommationApaItem => {
        const consommationApaIdentifier = getConsommationApaIdentifier(consommationApaItem);
        if (consommationApaIdentifier == null || consommationApaCollectionIdentifiers.includes(consommationApaIdentifier)) {
          return false;
        }
        consommationApaCollectionIdentifiers.push(consommationApaIdentifier);
        return true;
      });
      return [...consommationApasToAdd, ...consommationApaCollection];
    }
    return consommationApaCollection;
  }

  protected convertDateFromClient(consommationApa: IConsommationApa): IConsommationApa {
    return Object.assign({}, consommationApa, {
      date: consommationApa.date?.isValid() ? consommationApa.date.toJSON() : undefined,
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
      res.body.forEach((consommationApa: IConsommationApa) => {
        consommationApa.date = consommationApa.date ? dayjs(consommationApa.date) : undefined;
      });
    }
    return res;
  }
}
