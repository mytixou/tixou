import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStrategiePchE, StrategiePchE } from '../strategie-pch-e.model';
import { StrategiePchEService } from '../service/strategie-pch-e.service';

@Injectable({ providedIn: 'root' })
export class StrategiePchERoutingResolveService implements Resolve<IStrategiePchE> {
  constructor(protected service: StrategiePchEService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStrategiePchE> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((strategiePchE: HttpResponse<StrategiePchE>) => {
          if (strategiePchE.body) {
            return of(strategiePchE.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StrategiePchE());
  }
}
