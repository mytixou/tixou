import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISoldeApa, SoldeApa } from '../solde-apa.model';
import { SoldeApaService } from '../service/solde-apa.service';

@Injectable({ providedIn: 'root' })
export class SoldeApaRoutingResolveService implements Resolve<ISoldeApa> {
  constructor(protected service: SoldeApaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISoldeApa> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((soldeApa: HttpResponse<SoldeApa>) => {
          if (soldeApa.body) {
            return of(soldeApa.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SoldeApa());
  }
}
