import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INatureMontant, NatureMontant } from '../nature-montant.model';
import { NatureMontantService } from '../service/nature-montant.service';

@Injectable({ providedIn: 'root' })
export class NatureMontantRoutingResolveService implements Resolve<INatureMontant> {
  constructor(protected service: NatureMontantService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INatureMontant> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((natureMontant: HttpResponse<NatureMontant>) => {
          if (natureMontant.body) {
            return of(natureMontant.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NatureMontant());
  }
}
