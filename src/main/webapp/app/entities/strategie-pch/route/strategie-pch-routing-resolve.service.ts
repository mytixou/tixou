import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStrategiePch, StrategiePch } from '../strategie-pch.model';
import { StrategiePchService } from '../service/strategie-pch.service';

@Injectable({ providedIn: 'root' })
export class StrategiePchRoutingResolveService implements Resolve<IStrategiePch> {
  constructor(protected service: StrategiePchService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStrategiePch> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((strategiePch: HttpResponse<StrategiePch>) => {
          if (strategiePch.body) {
            return of(strategiePch.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StrategiePch());
  }
}
