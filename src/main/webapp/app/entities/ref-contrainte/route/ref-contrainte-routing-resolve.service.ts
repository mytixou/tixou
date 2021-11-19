import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRefContrainte, RefContrainte } from '../ref-contrainte.model';
import { RefContrainteService } from '../service/ref-contrainte.service';

@Injectable({ providedIn: 'root' })
export class RefContrainteRoutingResolveService implements Resolve<IRefContrainte> {
  constructor(protected service: RefContrainteService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRefContrainte> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((refContrainte: HttpResponse<RefContrainte>) => {
          if (refContrainte.body) {
            return of(refContrainte.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RefContrainte());
  }
}
