import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStrategieApa, StrategieApa } from '../strategie-apa.model';
import { StrategieApaService } from '../service/strategie-apa.service';

@Injectable({ providedIn: 'root' })
export class StrategieApaRoutingResolveService implements Resolve<IStrategieApa> {
  constructor(protected service: StrategieApaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStrategieApa> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((strategieApa: HttpResponse<StrategieApa>) => {
          if (strategieApa.body) {
            return of(strategieApa.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StrategieApa());
  }
}
