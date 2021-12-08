import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISoldePchE, SoldePchE } from '../solde-pch-e.model';
import { SoldePchEService } from '../service/solde-pch-e.service';

@Injectable({ providedIn: 'root' })
export class SoldePchERoutingResolveService implements Resolve<ISoldePchE> {
  constructor(protected service: SoldePchEService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISoldePchE> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((soldePchE: HttpResponse<SoldePchE>) => {
          if (soldePchE.body) {
            return of(soldePchE.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SoldePchE());
  }
}
