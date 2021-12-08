import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStrategieCi, getStrategieCiIdentifier } from '../strategie-ci.model';

export type EntityResponseType = HttpResponse<IStrategieCi>;
export type EntityArrayResponseType = HttpResponse<IStrategieCi[]>;

@Injectable({ providedIn: 'root' })
export class StrategieCiService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/strategie-cis');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(strategieCi: IStrategieCi): Observable<EntityResponseType> {
    return this.http.post<IStrategieCi>(this.resourceUrl, strategieCi, { observe: 'response' });
  }

  update(strategieCi: IStrategieCi): Observable<EntityResponseType> {
    return this.http.put<IStrategieCi>(`${this.resourceUrl}/${getStrategieCiIdentifier(strategieCi) as number}`, strategieCi, {
      observe: 'response',
    });
  }

  partialUpdate(strategieCi: IStrategieCi): Observable<EntityResponseType> {
    return this.http.patch<IStrategieCi>(`${this.resourceUrl}/${getStrategieCiIdentifier(strategieCi) as number}`, strategieCi, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStrategieCi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStrategieCi[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addStrategieCiToCollectionIfMissing(
    strategieCiCollection: IStrategieCi[],
    ...strategieCisToCheck: (IStrategieCi | null | undefined)[]
  ): IStrategieCi[] {
    const strategieCis: IStrategieCi[] = strategieCisToCheck.filter(isPresent);
    if (strategieCis.length > 0) {
      const strategieCiCollectionIdentifiers = strategieCiCollection.map(strategieCiItem => getStrategieCiIdentifier(strategieCiItem)!);
      const strategieCisToAdd = strategieCis.filter(strategieCiItem => {
        const strategieCiIdentifier = getStrategieCiIdentifier(strategieCiItem);
        if (strategieCiIdentifier == null || strategieCiCollectionIdentifiers.includes(strategieCiIdentifier)) {
          return false;
        }
        strategieCiCollectionIdentifiers.push(strategieCiIdentifier);
        return true;
      });
      return [...strategieCisToAdd, ...strategieCiCollection];
    }
    return strategieCiCollection;
  }
}
