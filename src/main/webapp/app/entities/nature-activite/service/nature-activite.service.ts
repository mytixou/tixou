import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INatureActivite, getNatureActiviteIdentifier } from '../nature-activite.model';

export type EntityResponseType = HttpResponse<INatureActivite>;
export type EntityArrayResponseType = HttpResponse<INatureActivite[]>;

@Injectable({ providedIn: 'root' })
export class NatureActiviteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nature-activites');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(natureActivite: INatureActivite): Observable<EntityResponseType> {
    return this.http.post<INatureActivite>(this.resourceUrl, natureActivite, { observe: 'response' });
  }

  update(natureActivite: INatureActivite): Observable<EntityResponseType> {
    return this.http.put<INatureActivite>(`${this.resourceUrl}/${getNatureActiviteIdentifier(natureActivite) as number}`, natureActivite, {
      observe: 'response',
    });
  }

  partialUpdate(natureActivite: INatureActivite): Observable<EntityResponseType> {
    return this.http.patch<INatureActivite>(
      `${this.resourceUrl}/${getNatureActiviteIdentifier(natureActivite) as number}`,
      natureActivite,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INatureActivite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INatureActivite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addNatureActiviteToCollectionIfMissing(
    natureActiviteCollection: INatureActivite[],
    ...natureActivitesToCheck: (INatureActivite | null | undefined)[]
  ): INatureActivite[] {
    const natureActivites: INatureActivite[] = natureActivitesToCheck.filter(isPresent);
    if (natureActivites.length > 0) {
      const natureActiviteCollectionIdentifiers = natureActiviteCollection.map(
        natureActiviteItem => getNatureActiviteIdentifier(natureActiviteItem)!
      );
      const natureActivitesToAdd = natureActivites.filter(natureActiviteItem => {
        const natureActiviteIdentifier = getNatureActiviteIdentifier(natureActiviteItem);
        if (natureActiviteIdentifier == null || natureActiviteCollectionIdentifiers.includes(natureActiviteIdentifier)) {
          return false;
        }
        natureActiviteCollectionIdentifiers.push(natureActiviteIdentifier);
        return true;
      });
      return [...natureActivitesToAdd, ...natureActiviteCollection];
    }
    return natureActiviteCollection;
  }
}
