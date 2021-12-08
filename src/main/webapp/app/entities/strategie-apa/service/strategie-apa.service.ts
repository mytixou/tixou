import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStrategieApa, getStrategieApaIdentifier } from '../strategie-apa.model';

export type EntityResponseType = HttpResponse<IStrategieApa>;
export type EntityArrayResponseType = HttpResponse<IStrategieApa[]>;

@Injectable({ providedIn: 'root' })
export class StrategieApaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/strategie-apas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(strategieApa: IStrategieApa): Observable<EntityResponseType> {
    return this.http.post<IStrategieApa>(this.resourceUrl, strategieApa, { observe: 'response' });
  }

  update(strategieApa: IStrategieApa): Observable<EntityResponseType> {
    return this.http.put<IStrategieApa>(`${this.resourceUrl}/${getStrategieApaIdentifier(strategieApa) as number}`, strategieApa, {
      observe: 'response',
    });
  }

  partialUpdate(strategieApa: IStrategieApa): Observable<EntityResponseType> {
    return this.http.patch<IStrategieApa>(`${this.resourceUrl}/${getStrategieApaIdentifier(strategieApa) as number}`, strategieApa, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStrategieApa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStrategieApa[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addStrategieApaToCollectionIfMissing(
    strategieApaCollection: IStrategieApa[],
    ...strategieApasToCheck: (IStrategieApa | null | undefined)[]
  ): IStrategieApa[] {
    const strategieApas: IStrategieApa[] = strategieApasToCheck.filter(isPresent);
    if (strategieApas.length > 0) {
      const strategieApaCollectionIdentifiers = strategieApaCollection.map(
        strategieApaItem => getStrategieApaIdentifier(strategieApaItem)!
      );
      const strategieApasToAdd = strategieApas.filter(strategieApaItem => {
        const strategieApaIdentifier = getStrategieApaIdentifier(strategieApaItem);
        if (strategieApaIdentifier == null || strategieApaCollectionIdentifiers.includes(strategieApaIdentifier)) {
          return false;
        }
        strategieApaCollectionIdentifiers.push(strategieApaIdentifier);
        return true;
      });
      return [...strategieApasToAdd, ...strategieApaCollection];
    }
    return strategieApaCollection;
  }
}
