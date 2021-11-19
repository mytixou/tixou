import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IImpact, getImpactIdentifier } from '../impact.model';

export type EntityResponseType = HttpResponse<IImpact>;
export type EntityArrayResponseType = HttpResponse<IImpact[]>;

@Injectable({ providedIn: 'root' })
export class ImpactService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/impacts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(impact: IImpact): Observable<EntityResponseType> {
    return this.http.post<IImpact>(this.resourceUrl, impact, { observe: 'response' });
  }

  update(impact: IImpact): Observable<EntityResponseType> {
    return this.http.put<IImpact>(`${this.resourceUrl}/${getImpactIdentifier(impact) as number}`, impact, { observe: 'response' });
  }

  partialUpdate(impact: IImpact): Observable<EntityResponseType> {
    return this.http.patch<IImpact>(`${this.resourceUrl}/${getImpactIdentifier(impact) as number}`, impact, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IImpact>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IImpact[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addImpactToCollectionIfMissing(impactCollection: IImpact[], ...impactsToCheck: (IImpact | null | undefined)[]): IImpact[] {
    const impacts: IImpact[] = impactsToCheck.filter(isPresent);
    if (impacts.length > 0) {
      const impactCollectionIdentifiers = impactCollection.map(impactItem => getImpactIdentifier(impactItem)!);
      const impactsToAdd = impacts.filter(impactItem => {
        const impactIdentifier = getImpactIdentifier(impactItem);
        if (impactIdentifier == null || impactCollectionIdentifiers.includes(impactIdentifier)) {
          return false;
        }
        impactCollectionIdentifiers.push(impactIdentifier);
        return true;
      });
      return [...impactsToAdd, ...impactCollection];
    }
    return impactCollection;
  }
}
