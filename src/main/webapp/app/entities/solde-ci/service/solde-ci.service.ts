import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISoldeCi, getSoldeCiIdentifier } from '../solde-ci.model';

export type EntityResponseType = HttpResponse<ISoldeCi>;
export type EntityArrayResponseType = HttpResponse<ISoldeCi[]>;

@Injectable({ providedIn: 'root' })
export class SoldeCiService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/solde-cis');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(soldeCi: ISoldeCi): Observable<EntityResponseType> {
    return this.http.post<ISoldeCi>(this.resourceUrl, soldeCi, { observe: 'response' });
  }

  update(soldeCi: ISoldeCi): Observable<EntityResponseType> {
    return this.http.put<ISoldeCi>(`${this.resourceUrl}/${getSoldeCiIdentifier(soldeCi) as number}`, soldeCi, { observe: 'response' });
  }

  partialUpdate(soldeCi: ISoldeCi): Observable<EntityResponseType> {
    return this.http.patch<ISoldeCi>(`${this.resourceUrl}/${getSoldeCiIdentifier(soldeCi) as number}`, soldeCi, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISoldeCi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISoldeCi[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSoldeCiToCollectionIfMissing(soldeCiCollection: ISoldeCi[], ...soldeCisToCheck: (ISoldeCi | null | undefined)[]): ISoldeCi[] {
    const soldeCis: ISoldeCi[] = soldeCisToCheck.filter(isPresent);
    if (soldeCis.length > 0) {
      const soldeCiCollectionIdentifiers = soldeCiCollection.map(soldeCiItem => getSoldeCiIdentifier(soldeCiItem)!);
      const soldeCisToAdd = soldeCis.filter(soldeCiItem => {
        const soldeCiIdentifier = getSoldeCiIdentifier(soldeCiItem);
        if (soldeCiIdentifier == null || soldeCiCollectionIdentifiers.includes(soldeCiIdentifier)) {
          return false;
        }
        soldeCiCollectionIdentifiers.push(soldeCiIdentifier);
        return true;
      });
      return [...soldeCisToAdd, ...soldeCiCollection];
    }
    return soldeCiCollection;
  }
}
