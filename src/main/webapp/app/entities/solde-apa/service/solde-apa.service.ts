import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISoldeApa, getSoldeApaIdentifier } from '../solde-apa.model';

export type EntityResponseType = HttpResponse<ISoldeApa>;
export type EntityArrayResponseType = HttpResponse<ISoldeApa[]>;

@Injectable({ providedIn: 'root' })
export class SoldeApaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/solde-apas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(soldeApa: ISoldeApa): Observable<EntityResponseType> {
    return this.http.post<ISoldeApa>(this.resourceUrl, soldeApa, { observe: 'response' });
  }

  update(soldeApa: ISoldeApa): Observable<EntityResponseType> {
    return this.http.put<ISoldeApa>(`${this.resourceUrl}/${getSoldeApaIdentifier(soldeApa) as number}`, soldeApa, { observe: 'response' });
  }

  partialUpdate(soldeApa: ISoldeApa): Observable<EntityResponseType> {
    return this.http.patch<ISoldeApa>(`${this.resourceUrl}/${getSoldeApaIdentifier(soldeApa) as number}`, soldeApa, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISoldeApa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISoldeApa[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSoldeApaToCollectionIfMissing(soldeApaCollection: ISoldeApa[], ...soldeApasToCheck: (ISoldeApa | null | undefined)[]): ISoldeApa[] {
    const soldeApas: ISoldeApa[] = soldeApasToCheck.filter(isPresent);
    if (soldeApas.length > 0) {
      const soldeApaCollectionIdentifiers = soldeApaCollection.map(soldeApaItem => getSoldeApaIdentifier(soldeApaItem)!);
      const soldeApasToAdd = soldeApas.filter(soldeApaItem => {
        const soldeApaIdentifier = getSoldeApaIdentifier(soldeApaItem);
        if (soldeApaIdentifier == null || soldeApaCollectionIdentifiers.includes(soldeApaIdentifier)) {
          return false;
        }
        soldeApaCollectionIdentifiers.push(soldeApaIdentifier);
        return true;
      });
      return [...soldeApasToAdd, ...soldeApaCollection];
    }
    return soldeApaCollection;
  }
}
