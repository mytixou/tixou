import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConsommationCi, ConsommationCi } from '../consommation-ci.model';
import { ConsommationCiService } from '../service/consommation-ci.service';

@Injectable({ providedIn: 'root' })
export class ConsommationCiRoutingResolveService implements Resolve<IConsommationCi> {
  constructor(protected service: ConsommationCiService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsommationCi> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((consommationCi: HttpResponse<ConsommationCi>) => {
          if (consommationCi.body) {
            return of(consommationCi.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ConsommationCi());
  }
}
