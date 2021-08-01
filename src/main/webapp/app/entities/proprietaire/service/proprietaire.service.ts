import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProprietaire, getProprietaireIdentifier } from '../proprietaire.model';

export type EntityResponseType = HttpResponse<IProprietaire>;
export type EntityArrayResponseType = HttpResponse<IProprietaire[]>;

@Injectable({ providedIn: 'root' })
export class ProprietaireService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/proprietaires');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(proprietaire: IProprietaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(proprietaire);
    return this.http
      .post<IProprietaire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(proprietaire: IProprietaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(proprietaire);
    return this.http
      .put<IProprietaire>(`${this.resourceUrl}/${getProprietaireIdentifier(proprietaire) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(proprietaire: IProprietaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(proprietaire);
    return this.http
      .patch<IProprietaire>(`${this.resourceUrl}/${getProprietaireIdentifier(proprietaire) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProprietaire>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProprietaire[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProprietaireToCollectionIfMissing(
    proprietaireCollection: IProprietaire[],
    ...proprietairesToCheck: (IProprietaire | null | undefined)[]
  ): IProprietaire[] {
    const proprietaires: IProprietaire[] = proprietairesToCheck.filter(isPresent);
    if (proprietaires.length > 0) {
      const proprietaireCollectionIdentifiers = proprietaireCollection.map(
        proprietaireItem => getProprietaireIdentifier(proprietaireItem)!
      );
      const proprietairesToAdd = proprietaires.filter(proprietaireItem => {
        const proprietaireIdentifier = getProprietaireIdentifier(proprietaireItem);
        if (proprietaireIdentifier == null || proprietaireCollectionIdentifiers.includes(proprietaireIdentifier)) {
          return false;
        }
        proprietaireCollectionIdentifiers.push(proprietaireIdentifier);
        return true;
      });
      return [...proprietairesToAdd, ...proprietaireCollection];
    }
    return proprietaireCollection;
  }

  protected convertDateFromClient(proprietaire: IProprietaire): IProprietaire {
    return Object.assign({}, proprietaire, {
      depuis: proprietaire.depuis?.isValid() ? proprietaire.depuis.format(DATE_FORMAT) : undefined,
      finLe: proprietaire.finLe?.isValid() ? proprietaire.finLe.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.depuis = res.body.depuis ? dayjs(res.body.depuis) : undefined;
      res.body.finLe = res.body.finLe ? dayjs(res.body.finLe) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((proprietaire: IProprietaire) => {
        proprietaire.depuis = proprietaire.depuis ? dayjs(proprietaire.depuis) : undefined;
        proprietaire.finLe = proprietaire.finLe ? dayjs(proprietaire.finLe) : undefined;
      });
    }
    return res;
  }
}
