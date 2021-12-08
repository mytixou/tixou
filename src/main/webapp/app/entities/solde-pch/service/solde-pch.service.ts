import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISoldePch, getSoldePchIdentifier } from '../solde-pch.model';

export type EntityResponseType = HttpResponse<ISoldePch>;
export type EntityArrayResponseType = HttpResponse<ISoldePch[]>;

@Injectable({ providedIn: 'root' })
export class SoldePchService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/solde-pches');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(soldePch: ISoldePch): Observable<EntityResponseType> {
    return this.http.post<ISoldePch>(this.resourceUrl, soldePch, { observe: 'response' });
  }

  update(soldePch: ISoldePch): Observable<EntityResponseType> {
    return this.http.put<ISoldePch>(`${this.resourceUrl}/${getSoldePchIdentifier(soldePch) as number}`, soldePch, { observe: 'response' });
  }

  partialUpdate(soldePch: ISoldePch): Observable<EntityResponseType> {
    return this.http.patch<ISoldePch>(`${this.resourceUrl}/${getSoldePchIdentifier(soldePch) as number}`, soldePch, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISoldePch>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISoldePch[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSoldePchToCollectionIfMissing(soldePchCollection: ISoldePch[], ...soldePchesToCheck: (ISoldePch | null | undefined)[]): ISoldePch[] {
    const soldePches: ISoldePch[] = soldePchesToCheck.filter(isPresent);
    if (soldePches.length > 0) {
      const soldePchCollectionIdentifiers = soldePchCollection.map(soldePchItem => getSoldePchIdentifier(soldePchItem)!);
      const soldePchesToAdd = soldePches.filter(soldePchItem => {
        const soldePchIdentifier = getSoldePchIdentifier(soldePchItem);
        if (soldePchIdentifier == null || soldePchCollectionIdentifiers.includes(soldePchIdentifier)) {
          return false;
        }
        soldePchCollectionIdentifiers.push(soldePchIdentifier);
        return true;
      });
      return [...soldePchesToAdd, ...soldePchCollection];
    }
    return soldePchCollection;
  }
}
