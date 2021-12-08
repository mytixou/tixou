import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITiersFinanceur, TiersFinanceur } from '../tiers-financeur.model';
import { TiersFinanceurService } from '../service/tiers-financeur.service';

@Injectable({ providedIn: 'root' })
export class TiersFinanceurRoutingResolveService implements Resolve<ITiersFinanceur> {
  constructor(protected service: TiersFinanceurService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITiersFinanceur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tiersFinanceur: HttpResponse<TiersFinanceur>) => {
          if (tiersFinanceur.body) {
            return of(tiersFinanceur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TiersFinanceur());
  }
}
