import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StrategiePchEComponent } from '../list/strategie-pch-e.component';
import { StrategiePchEDetailComponent } from '../detail/strategie-pch-e-detail.component';
import { StrategiePchEUpdateComponent } from '../update/strategie-pch-e-update.component';
import { StrategiePchERoutingResolveService } from './strategie-pch-e-routing-resolve.service';

const strategiePchERoute: Routes = [
  {
    path: '',
    component: StrategiePchEComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StrategiePchEDetailComponent,
    resolve: {
      strategiePchE: StrategiePchERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StrategiePchEUpdateComponent,
    resolve: {
      strategiePchE: StrategiePchERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StrategiePchEUpdateComponent,
    resolve: {
      strategiePchE: StrategiePchERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(strategiePchERoute)],
  exports: [RouterModule],
})
export class StrategiePchERoutingModule {}
