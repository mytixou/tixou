import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStrategiePch, getStrategiePchIdentifier } from '../strategie-pch.model';

export type EntityResponseType = HttpResponse<IStrategiePch>;
export type EntityArrayResponseType = HttpResponse<IStrategiePch[]>;

@Injectable({ providedIn: 'root' })
export class StrategiePchService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/strategie-pches');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(strategiePch: IStrategiePch): Observable<EntityResponseType> {
    return this.http.post<IStrategiePch>(this.resourceUrl, strategiePch, { observe: 'response' });
  }

  update(strategiePch: IStrategiePch): Observable<EntityResponseType> {
    return this.http.put<IStrategiePch>(`${this.resourceUrl}/${getStrategiePchIdentifier(strategiePch) as number}`, strategiePch, {
      observe: 'response',
    });
  }

  partialUpdate(strategiePch: IStrategiePch): Observable<EntityResponseType> {
    return this.http.patch<IStrategiePch>(`${this.resourceUrl}/${getStrategiePchIdentifier(strategiePch) as number}`, strategiePch, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStrategiePch>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStrategiePch[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addStrategiePchToCollectionIfMissing(
    strategiePchCollection: IStrategiePch[],
    ...strategiePchesToCheck: (IStrategiePch | null | undefined)[]
  ): IStrategiePch[] {
    const strategiePches: IStrategiePch[] = strategiePchesToCheck.filter(isPresent);
    if (strategiePches.length > 0) {
      const strategiePchCollectionIdentifiers = strategiePchCollection.map(
        strategiePchItem => getStrategiePchIdentifier(strategiePchItem)!
      );
      const strategiePchesToAdd = strategiePches.filter(strategiePchItem => {
        const strategiePchIdentifier = getStrategiePchIdentifier(strategiePchItem);
        if (strategiePchIdentifier == null || strategiePchCollectionIdentifiers.includes(strategiePchIdentifier)) {
          return false;
        }
        strategiePchCollectionIdentifiers.push(strategiePchIdentifier);
        return true;
      });
      return [...strategiePchesToAdd, ...strategiePchCollection];
    }
    return strategiePchCollection;
  }
}
