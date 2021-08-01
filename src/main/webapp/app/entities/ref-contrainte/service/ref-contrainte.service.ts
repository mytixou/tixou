import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRefContrainte, getRefContrainteIdentifier } from '../ref-contrainte.model';

export type EntityResponseType = HttpResponse<IRefContrainte>;
export type EntityArrayResponseType = HttpResponse<IRefContrainte[]>;

@Injectable({ providedIn: 'root' })
export class RefContrainteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ref-contraintes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(refContrainte: IRefContrainte): Observable<EntityResponseType> {
    return this.http.post<IRefContrainte>(this.resourceUrl, refContrainte, { observe: 'response' });
  }

  update(refContrainte: IRefContrainte): Observable<EntityResponseType> {
    return this.http.put<IRefContrainte>(`${this.resourceUrl}/${getRefContrainteIdentifier(refContrainte) as number}`, refContrainte, {
      observe: 'response',
    });
  }

  partialUpdate(refContrainte: IRefContrainte): Observable<EntityResponseType> {
    return this.http.patch<IRefContrainte>(`${this.resourceUrl}/${getRefContrainteIdentifier(refContrainte) as number}`, refContrainte, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRefContrainte>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRefContrainte[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRefContrainteToCollectionIfMissing(
    refContrainteCollection: IRefContrainte[],
    ...refContraintesToCheck: (IRefContrainte | null | undefined)[]
  ): IRefContrainte[] {
    const refContraintes: IRefContrainte[] = refContraintesToCheck.filter(isPresent);
    if (refContraintes.length > 0) {
      const refContrainteCollectionIdentifiers = refContrainteCollection.map(
        refContrainteItem => getRefContrainteIdentifier(refContrainteItem)!
      );
      const refContraintesToAdd = refContraintes.filter(refContrainteItem => {
        const refContrainteIdentifier = getRefContrainteIdentifier(refContrainteItem);
        if (refContrainteIdentifier == null || refContrainteCollectionIdentifiers.includes(refContrainteIdentifier)) {
          return false;
        }
        refContrainteCollectionIdentifiers.push(refContrainteIdentifier);
        return true;
      });
      return [...refContraintesToAdd, ...refContrainteCollection];
    }
    return refContrainteCollection;
  }
}
