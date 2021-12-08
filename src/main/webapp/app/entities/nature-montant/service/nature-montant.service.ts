import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INatureMontant, getNatureMontantIdentifier } from '../nature-montant.model';

export type EntityResponseType = HttpResponse<INatureMontant>;
export type EntityArrayResponseType = HttpResponse<INatureMontant[]>;

@Injectable({ providedIn: 'root' })
export class NatureMontantService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nature-montants');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(natureMontant: INatureMontant): Observable<EntityResponseType> {
    return this.http.post<INatureMontant>(this.resourceUrl, natureMontant, { observe: 'response' });
  }

  update(natureMontant: INatureMontant): Observable<EntityResponseType> {
    return this.http.put<INatureMontant>(`${this.resourceUrl}/${getNatureMontantIdentifier(natureMontant) as number}`, natureMontant, {
      observe: 'response',
    });
  }

  partialUpdate(natureMontant: INatureMontant): Observable<EntityResponseType> {
    return this.http.patch<INatureMontant>(`${this.resourceUrl}/${getNatureMontantIdentifier(natureMontant) as number}`, natureMontant, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INatureMontant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INatureMontant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addNatureMontantToCollectionIfMissing(
    natureMontantCollection: INatureMontant[],
    ...natureMontantsToCheck: (INatureMontant | null | undefined)[]
  ): INatureMontant[] {
    const natureMontants: INatureMontant[] = natureMontantsToCheck.filter(isPresent);
    if (natureMontants.length > 0) {
      const natureMontantCollectionIdentifiers = natureMontantCollection.map(
        natureMontantItem => getNatureMontantIdentifier(natureMontantItem)!
      );
      const natureMontantsToAdd = natureMontants.filter(natureMontantItem => {
        const natureMontantIdentifier = getNatureMontantIdentifier(natureMontantItem);
        if (natureMontantIdentifier == null || natureMontantCollectionIdentifiers.includes(natureMontantIdentifier)) {
          return false;
        }
        natureMontantCollectionIdentifiers.push(natureMontantIdentifier);
        return true;
      });
      return [...natureMontantsToAdd, ...natureMontantCollection];
    }
    return natureMontantCollection;
  }
}
