import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAide, getAideIdentifier } from '../aide.model';

export type EntityResponseType = HttpResponse<IAide>;
export type EntityArrayResponseType = HttpResponse<IAide[]>;

@Injectable({ providedIn: 'root' })
export class AideService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/aides');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(aide: IAide): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aide);
    return this.http
      .post<IAide>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(aide: IAide): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aide);
    return this.http
      .put<IAide>(`${this.resourceUrl}/${getAideIdentifier(aide) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(aide: IAide): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aide);
    return this.http
      .patch<IAide>(`${this.resourceUrl}/${getAideIdentifier(aide) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAide>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAide[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAideToCollectionIfMissing(aideCollection: IAide[], ...aidesToCheck: (IAide | null | undefined)[]): IAide[] {
    const aides: IAide[] = aidesToCheck.filter(isPresent);
    if (aides.length > 0) {
      const aideCollectionIdentifiers = aideCollection.map(aideItem => getAideIdentifier(aideItem)!);
      const aidesToAdd = aides.filter(aideItem => {
        const aideIdentifier = getAideIdentifier(aideItem);
        if (aideIdentifier == null || aideCollectionIdentifiers.includes(aideIdentifier)) {
          return false;
        }
        aideCollectionIdentifiers.push(aideIdentifier);
        return true;
      });
      return [...aidesToAdd, ...aideCollection];
    }
    return aideCollection;
  }

  protected convertDateFromClient(aide: IAide): IAide {
    return Object.assign({}, aide, {
      dateLancement: aide.dateLancement?.isValid() ? aide.dateLancement.format(DATE_FORMAT) : undefined,
      dateArret: aide.dateArret?.isValid() ? aide.dateArret.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateLancement = res.body.dateLancement ? dayjs(res.body.dateLancement) : undefined;
      res.body.dateArret = res.body.dateArret ? dayjs(res.body.dateArret) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((aide: IAide) => {
        aide.dateLancement = aide.dateLancement ? dayjs(aide.dateLancement) : undefined;
        aide.dateArret = aide.dateArret ? dayjs(aide.dateArret) : undefined;
      });
    }
    return res;
  }
}
