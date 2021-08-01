import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IChoixReponse, getChoixReponseIdentifier } from '../choix-reponse.model';

export type EntityResponseType = HttpResponse<IChoixReponse>;
export type EntityArrayResponseType = HttpResponse<IChoixReponse[]>;

@Injectable({ providedIn: 'root' })
export class ChoixReponseService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/choix-reponses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(choixReponse: IChoixReponse): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(choixReponse);
    return this.http
      .post<IChoixReponse>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(choixReponse: IChoixReponse): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(choixReponse);
    return this.http
      .put<IChoixReponse>(`${this.resourceUrl}/${getChoixReponseIdentifier(choixReponse) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(choixReponse: IChoixReponse): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(choixReponse);
    return this.http
      .patch<IChoixReponse>(`${this.resourceUrl}/${getChoixReponseIdentifier(choixReponse) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IChoixReponse>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChoixReponse[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addChoixReponseToCollectionIfMissing(
    choixReponseCollection: IChoixReponse[],
    ...choixReponsesToCheck: (IChoixReponse | null | undefined)[]
  ): IChoixReponse[] {
    const choixReponses: IChoixReponse[] = choixReponsesToCheck.filter(isPresent);
    if (choixReponses.length > 0) {
      const choixReponseCollectionIdentifiers = choixReponseCollection.map(
        choixReponseItem => getChoixReponseIdentifier(choixReponseItem)!
      );
      const choixReponsesToAdd = choixReponses.filter(choixReponseItem => {
        const choixReponseIdentifier = getChoixReponseIdentifier(choixReponseItem);
        if (choixReponseIdentifier == null || choixReponseCollectionIdentifiers.includes(choixReponseIdentifier)) {
          return false;
        }
        choixReponseCollectionIdentifiers.push(choixReponseIdentifier);
        return true;
      });
      return [...choixReponsesToAdd, ...choixReponseCollection];
    }
    return choixReponseCollection;
  }

  protected convertDateFromClient(choixReponse: IChoixReponse): IChoixReponse {
    return Object.assign({}, choixReponse, {
      dateChoix: choixReponse.dateChoix?.isValid() ? choixReponse.dateChoix.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateChoix = res.body.dateChoix ? dayjs(res.body.dateChoix) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((choixReponse: IChoixReponse) => {
        choixReponse.dateChoix = choixReponse.dateChoix ? dayjs(choixReponse.dateChoix) : undefined;
      });
    }
    return res;
  }
}
