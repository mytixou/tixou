import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISoldeCi, SoldeCi } from '../solde-ci.model';
import { SoldeCiService } from '../service/solde-ci.service';

@Injectable({ providedIn: 'root' })
export class SoldeCiRoutingResolveService implements Resolve<ISoldeCi> {
  constructor(protected service: SoldeCiService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISoldeCi> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((soldeCi: HttpResponse<SoldeCi>) => {
          if (soldeCi.body) {
            return of(soldeCi.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SoldeCi());
  }
}
