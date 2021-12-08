import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConsommationPch, ConsommationPch } from '../consommation-pch.model';
import { ConsommationPchService } from '../service/consommation-pch.service';

@Injectable({ providedIn: 'root' })
export class ConsommationPchRoutingResolveService implements Resolve<IConsommationPch> {
  constructor(protected service: ConsommationPchService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsommationPch> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((consommationPch: HttpResponse<ConsommationPch>) => {
          if (consommationPch.body) {
            return of(consommationPch.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ConsommationPch());
  }
}
