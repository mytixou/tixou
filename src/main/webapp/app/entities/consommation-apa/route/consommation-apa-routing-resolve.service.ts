import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConsommationApa, ConsommationApa } from '../consommation-apa.model';
import { ConsommationApaService } from '../service/consommation-apa.service';

@Injectable({ providedIn: 'root' })
export class ConsommationApaRoutingResolveService implements Resolve<IConsommationApa> {
  constructor(protected service: ConsommationApaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsommationApa> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((consommationApa: HttpResponse<ConsommationApa>) => {
          if (consommationApa.body) {
            return of(consommationApa.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ConsommationApa());
  }
}
