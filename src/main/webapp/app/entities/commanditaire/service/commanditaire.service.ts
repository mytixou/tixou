import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICommanditaire, getCommanditaireIdentifier } from '../commanditaire.model';

export type EntityResponseType = HttpResponse<ICommanditaire>;
export type EntityArrayResponseType = HttpResponse<ICommanditaire[]>;

@Injectable({ providedIn: 'root' })
export class CommanditaireService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/commanditaires');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(commanditaire: ICommanditaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(commanditaire);
    return this.http
      .post<ICommanditaire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(commanditaire: ICommanditaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(commanditaire);
    return this.http
      .put<ICommanditaire>(`${this.resourceUrl}/${getCommanditaireIdentifier(commanditaire) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(commanditaire: ICommanditaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(commanditaire);
    return this.http
      .patch<ICommanditaire>(`${this.resourceUrl}/${getCommanditaireIdentifier(commanditaire) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICommanditaire>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICommanditaire[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCommanditaireToCollectionIfMissing(
    commanditaireCollection: ICommanditaire[],
    ...commanditairesToCheck: (ICommanditaire | null | undefined)[]
  ): ICommanditaire[] {
    const commanditaires: ICommanditaire[] = commanditairesToCheck.filter(isPresent);
    if (commanditaires.length > 0) {
      const commanditaireCollectionIdentifiers = commanditaireCollection.map(
        commanditaireItem => getCommanditaireIdentifier(commanditaireItem)!
      );
      const commanditairesToAdd = commanditaires.filter(commanditaireItem => {
        const commanditaireIdentifier = getCommanditaireIdentifier(commanditaireItem);
        if (commanditaireIdentifier == null || commanditaireCollectionIdentifiers.includes(commanditaireIdentifier)) {
          return false;
        }
        commanditaireCollectionIdentifiers.push(commanditaireIdentifier);
        return true;
      });
      return [...commanditairesToAdd, ...commanditaireCollection];
    }
    return commanditaireCollection;
  }

  protected convertDateFromClient(commanditaire: ICommanditaire): ICommanditaire {
    return Object.assign({}, commanditaire, {
      connuDepuis: commanditaire.connuDepuis?.isValid() ? commanditaire.connuDepuis.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.connuDepuis = res.body.connuDepuis ? dayjs(res.body.connuDepuis) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((commanditaire: ICommanditaire) => {
        commanditaire.connuDepuis = commanditaire.connuDepuis ? dayjs(commanditaire.connuDepuis) : undefined;
      });
    }
    return res;
  }
}
