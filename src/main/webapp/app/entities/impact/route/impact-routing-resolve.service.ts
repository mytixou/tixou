import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IImpact, Impact } from '../impact.model';
import { ImpactService } from '../service/impact.service';

@Injectable({ providedIn: 'root' })
export class ImpactRoutingResolveService implements Resolve<IImpact> {
  constructor(protected service: ImpactService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IImpact> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((impact: HttpResponse<Impact>) => {
          if (impact.body) {
            return of(impact.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Impact());
  }
}
