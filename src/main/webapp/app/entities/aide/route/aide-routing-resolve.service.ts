import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAide, Aide } from '../aide.model';
import { AideService } from '../service/aide.service';

@Injectable({ providedIn: 'root' })
export class AideRoutingResolveService implements Resolve<IAide> {
  constructor(protected service: AideService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAide> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((aide: HttpResponse<Aide>) => {
          if (aide.body) {
            return of(aide.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Aide());
  }
}
