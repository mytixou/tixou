import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITiersFinanceur, getTiersFinanceurIdentifier } from '../tiers-financeur.model';

export type EntityResponseType = HttpResponse<ITiersFinanceur>;
export type EntityArrayResponseType = HttpResponse<ITiersFinanceur[]>;

@Injectable({ providedIn: 'root' })
export class TiersFinanceurService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tiers-financeurs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tiersFinanceur: ITiersFinanceur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tiersFinanceur);
    return this.http
      .post<ITiersFinanceur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tiersFinanceur: ITiersFinanceur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tiersFinanceur);
    return this.http
      .put<ITiersFinanceur>(`${this.resourceUrl}/${getTiersFinanceurIdentifier(tiersFinanceur) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(tiersFinanceur: ITiersFinanceur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tiersFinanceur);
    return this.http
      .patch<ITiersFinanceur>(`${this.resourceUrl}/${getTiersFinanceurIdentifier(tiersFinanceur) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITiersFinanceur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITiersFinanceur[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTiersFinanceurToCollectionIfMissing(
    tiersFinanceurCollection: ITiersFinanceur[],
    ...tiersFinanceursToCheck: (ITiersFinanceur | null | undefined)[]
  ): ITiersFinanceur[] {
    const tiersFinanceurs: ITiersFinanceur[] = tiersFinanceursToCheck.filter(isPresent);
    if (tiersFinanceurs.length > 0) {
      const tiersFinanceurCollectionIdentifiers = tiersFinanceurCollection.map(
        tiersFinanceurItem => getTiersFinanceurIdentifier(tiersFinanceurItem)!
      );
      const tiersFinanceursToAdd = tiersFinanceurs.filter(tiersFinanceurItem => {
        const tiersFinanceurIdentifier = getTiersFinanceurIdentifier(tiersFinanceurItem);
        if (tiersFinanceurIdentifier == null || tiersFinanceurCollectionIdentifiers.includes(tiersFinanceurIdentifier)) {
          return false;
        }
        tiersFinanceurCollectionIdentifiers.push(tiersFinanceurIdentifier);
        return true;
      });
      return [...tiersFinanceursToAdd, ...tiersFinanceurCollection];
    }
    return tiersFinanceurCollection;
  }

  protected convertDateFromClient(tiersFinanceur: ITiersFinanceur): ITiersFinanceur {
    return Object.assign({}, tiersFinanceur, {
      dateInscription: tiersFinanceur.dateInscription?.isValid() ? tiersFinanceur.dateInscription.format(DATE_FORMAT) : undefined,
      dateResiliation: tiersFinanceur.dateResiliation?.isValid() ? tiersFinanceur.dateResiliation.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateInscription = res.body.dateInscription ? dayjs(res.body.dateInscription) : undefined;
      res.body.dateResiliation = res.body.dateResiliation ? dayjs(res.body.dateResiliation) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((tiersFinanceur: ITiersFinanceur) => {
        tiersFinanceur.dateInscription = tiersFinanceur.dateInscription ? dayjs(tiersFinanceur.dateInscription) : undefined;
        tiersFinanceur.dateResiliation = tiersFinanceur.dateResiliation ? dayjs(tiersFinanceur.dateResiliation) : undefined;
      });
    }
    return res;
  }
}
