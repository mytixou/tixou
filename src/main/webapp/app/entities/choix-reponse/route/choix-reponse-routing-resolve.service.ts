import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IChoixReponse, ChoixReponse } from '../choix-reponse.model';
import { ChoixReponseService } from '../service/choix-reponse.service';

@Injectable({ providedIn: 'root' })
export class ChoixReponseRoutingResolveService implements Resolve<IChoixReponse> {
  constructor(protected service: ChoixReponseService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChoixReponse> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((choixReponse: HttpResponse<ChoixReponse>) => {
          if (choixReponse.body) {
            return of(choixReponse.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChoixReponse());
  }
}
