import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConsommationPchE, ConsommationPchE } from '../consommation-pch-e.model';
import { ConsommationPchEService } from '../service/consommation-pch-e.service';

@Injectable({ providedIn: 'root' })
export class ConsommationPchERoutingResolveService implements Resolve<IConsommationPchE> {
  constructor(protected service: ConsommationPchEService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsommationPchE> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((consommationPchE: HttpResponse<ConsommationPchE>) => {
          if (consommationPchE.body) {
            return of(consommationPchE.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ConsommationPchE());
  }
}
