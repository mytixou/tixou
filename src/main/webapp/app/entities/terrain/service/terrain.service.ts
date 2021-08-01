import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITerrain, getTerrainIdentifier } from '../terrain.model';

export type EntityResponseType = HttpResponse<ITerrain>;
export type EntityArrayResponseType = HttpResponse<ITerrain[]>;

@Injectable({ providedIn: 'root' })
export class TerrainService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/terrains');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(terrain: ITerrain): Observable<EntityResponseType> {
    return this.http.post<ITerrain>(this.resourceUrl, terrain, { observe: 'response' });
  }

  update(terrain: ITerrain): Observable<EntityResponseType> {
    return this.http.put<ITerrain>(`${this.resourceUrl}/${getTerrainIdentifier(terrain) as number}`, terrain, { observe: 'response' });
  }

  partialUpdate(terrain: ITerrain): Observable<EntityResponseType> {
    return this.http.patch<ITerrain>(`${this.resourceUrl}/${getTerrainIdentifier(terrain) as number}`, terrain, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITerrain>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITerrain[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTerrainToCollectionIfMissing(terrainCollection: ITerrain[], ...terrainsToCheck: (ITerrain | null | undefined)[]): ITerrain[] {
    const terrains: ITerrain[] = terrainsToCheck.filter(isPresent);
    if (terrains.length > 0) {
      const terrainCollectionIdentifiers = terrainCollection.map(terrainItem => getTerrainIdentifier(terrainItem)!);
      const terrainsToAdd = terrains.filter(terrainItem => {
        const terrainIdentifier = getTerrainIdentifier(terrainItem);
        if (terrainIdentifier == null || terrainCollectionIdentifiers.includes(terrainIdentifier)) {
          return false;
        }
        terrainCollectionIdentifiers.push(terrainIdentifier);
        return true;
      });
      return [...terrainsToAdd, ...terrainCollection];
    }
    return terrainCollection;
  }
}
