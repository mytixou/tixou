import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISoldePch, SoldePch } from '../solde-pch.model';
import { SoldePchService } from '../service/solde-pch.service';

@Injectable({ providedIn: 'root' })
export class SoldePchRoutingResolveService implements Resolve<ISoldePch> {
  constructor(protected service: SoldePchService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISoldePch> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((soldePch: HttpResponse<SoldePch>) => {
          if (soldePch.body) {
            return of(soldePch.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SoldePch());
  }
}
