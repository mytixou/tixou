import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICommanditaire, Commanditaire } from '../commanditaire.model';
import { CommanditaireService } from '../service/commanditaire.service';

@Injectable({ providedIn: 'root' })
export class CommanditaireRoutingResolveService implements Resolve<ICommanditaire> {
  constructor(protected service: CommanditaireService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICommanditaire> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((commanditaire: HttpResponse<Commanditaire>) => {
          if (commanditaire.body) {
            return of(commanditaire.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Commanditaire());
  }
}
