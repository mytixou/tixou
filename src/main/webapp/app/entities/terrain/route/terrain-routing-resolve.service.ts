import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITerrain, Terrain } from '../terrain.model';
import { TerrainService } from '../service/terrain.service';

@Injectable({ providedIn: 'root' })
export class TerrainRoutingResolveService implements Resolve<ITerrain> {
  constructor(protected service: TerrainService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITerrain> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((terrain: HttpResponse<Terrain>) => {
          if (terrain.body) {
            return of(terrain.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Terrain());
  }
}
