import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStrategiePchE, getStrategiePchEIdentifier } from '../strategie-pch-e.model';

export type EntityResponseType = HttpResponse<IStrategiePchE>;
export type EntityArrayResponseType = HttpResponse<IStrategiePchE[]>;

@Injectable({ providedIn: 'root' })
export class StrategiePchEService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/strategie-pch-es');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(strategiePchE: IStrategiePchE): Observable<EntityResponseType> {
    return this.http.post<IStrategiePchE>(this.resourceUrl, strategiePchE, { observe: 'response' });
  }

  update(strategiePchE: IStrategiePchE): Observable<EntityResponseType> {
    return this.http.put<IStrategiePchE>(`${this.resourceUrl}/${getStrategiePchEIdentifier(strategiePchE) as number}`, strategiePchE, {
      observe: 'response',
    });
  }

  partialUpdate(strategiePchE: IStrategiePchE): Observable<EntityResponseType> {
    return this.http.patch<IStrategiePchE>(`${this.resourceUrl}/${getStrategiePchEIdentifier(strategiePchE) as number}`, strategiePchE, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStrategiePchE>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStrategiePchE[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addStrategiePchEToCollectionIfMissing(
    strategiePchECollection: IStrategiePchE[],
    ...strategiePchESToCheck: (IStrategiePchE | null | undefined)[]
  ): IStrategiePchE[] {
    const strategiePchES: IStrategiePchE[] = strategiePchESToCheck.filter(isPresent);
    if (strategiePchES.length > 0) {
      const strategiePchECollectionIdentifiers = strategiePchECollection.map(
        strategiePchEItem => getStrategiePchEIdentifier(strategiePchEItem)!
      );
      const strategiePchESToAdd = strategiePchES.filter(strategiePchEItem => {
        const strategiePchEIdentifier = getStrategiePchEIdentifier(strategiePchEItem);
        if (strategiePchEIdentifier == null || strategiePchECollectionIdentifiers.includes(strategiePchEIdentifier)) {
          return false;
        }
        strategiePchECollectionIdentifiers.push(strategiePchEIdentifier);
        return true;
      });
      return [...strategiePchESToAdd, ...strategiePchECollection];
    }
    return strategiePchECollection;
  }
}
