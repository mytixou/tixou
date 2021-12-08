import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StrategieCiComponent } from '../list/strategie-ci.component';
import { StrategieCiDetailComponent } from '../detail/strategie-ci-detail.component';
import { StrategieCiUpdateComponent } from '../update/strategie-ci-update.component';
import { StrategieCiRoutingResolveService } from './strategie-ci-routing-resolve.service';

const strategieCiRoute: Routes = [
  {
    path: '',
    component: StrategieCiComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StrategieCiDetailComponent,
    resolve: {
      strategieCi: StrategieCiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StrategieCiUpdateComponent,
    resolve: {
      strategieCi: StrategieCiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StrategieCiUpdateComponent,
    resolve: {
      strategieCi: StrategieCiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(strategieCiRoute)],
  exports: [RouterModule],
})
export class StrategieCiRoutingModule {}
