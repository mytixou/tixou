import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStrategieCi, StrategieCi } from '../strategie-ci.model';
import { StrategieCiService } from '../service/strategie-ci.service';

@Injectable({ providedIn: 'root' })
export class StrategieCiRoutingResolveService implements Resolve<IStrategieCi> {
  constructor(protected service: StrategieCiService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStrategieCi> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((strategieCi: HttpResponse<StrategieCi>) => {
          if (strategieCi.body) {
            return of(strategieCi.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StrategieCi());
  }
}
