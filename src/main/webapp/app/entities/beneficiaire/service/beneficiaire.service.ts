import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBeneficiaire, getBeneficiaireIdentifier } from '../beneficiaire.model';

export type EntityResponseType = HttpResponse<IBeneficiaire>;
export type EntityArrayResponseType = HttpResponse<IBeneficiaire[]>;

@Injectable({ providedIn: 'root' })
export class BeneficiaireService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/beneficiaires');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(beneficiaire: IBeneficiaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(beneficiaire);
    return this.http
      .post<IBeneficiaire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(beneficiaire: IBeneficiaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(beneficiaire);
    return this.http
      .put<IBeneficiaire>(`${this.resourceUrl}/${getBeneficiaireIdentifier(beneficiaire) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(beneficiaire: IBeneficiaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(beneficiaire);
    return this.http
      .patch<IBeneficiaire>(`${this.resourceUrl}/${getBeneficiaireIdentifier(beneficiaire) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IBeneficiaire>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBeneficiaire[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addBeneficiaireToCollectionIfMissing(
    beneficiaireCollection: IBeneficiaire[],
    ...beneficiairesToCheck: (IBeneficiaire | null | undefined)[]
  ): IBeneficiaire[] {
    const beneficiaires: IBeneficiaire[] = beneficiairesToCheck.filter(isPresent);
    if (beneficiaires.length > 0) {
      const beneficiaireCollectionIdentifiers = beneficiaireCollection.map(
        beneficiaireItem => getBeneficiaireIdentifier(beneficiaireItem)!
      );
      const beneficiairesToAdd = beneficiaires.filter(beneficiaireItem => {
        const beneficiaireIdentifier = getBeneficiaireIdentifier(beneficiaireItem);
        if (beneficiaireIdentifier == null || beneficiaireCollectionIdentifiers.includes(beneficiaireIdentifier)) {
          return false;
        }
        beneficiaireCollectionIdentifiers.push(beneficiaireIdentifier);
        return true;
      });
      return [...beneficiairesToAdd, ...beneficiaireCollection];
    }
    return beneficiaireCollection;
  }

  protected convertDateFromClient(beneficiaire: IBeneficiaire): IBeneficiaire {
    return Object.assign({}, beneficiaire, {
      dateInscription: beneficiaire.dateInscription?.isValid() ? beneficiaire.dateInscription.format(DATE_FORMAT) : undefined,
      dateResiliation: beneficiaire.dateResiliation?.isValid() ? beneficiaire.dateResiliation.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateInscription = res.body.dateInscription ? dayjs(res.body.dateInscription) : undefined;
      res.body.dateResiliation = res.body.dateResiliation ? dayjs(res.body.dateResiliation) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((beneficiaire: IBeneficiaire) => {
        beneficiaire.dateInscription = beneficiaire.dateInscription ? dayjs(beneficiaire.dateInscription) : undefined;
        beneficiaire.dateResiliation = beneficiaire.dateResiliation ? dayjs(beneficiaire.dateResiliation) : undefined;
      });
    }
    return res;
  }
}
