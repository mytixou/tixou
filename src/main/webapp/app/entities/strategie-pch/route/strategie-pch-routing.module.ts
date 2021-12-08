import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StrategiePchComponent } from '../list/strategie-pch.component';
import { StrategiePchDetailComponent } from '../detail/strategie-pch-detail.component';
import { StrategiePchUpdateComponent } from '../update/strategie-pch-update.component';
import { StrategiePchRoutingResolveService } from './strategie-pch-routing-resolve.service';

const strategiePchRoute: Routes = [
  {
    path: '',
    component: StrategiePchComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StrategiePchDetailComponent,
    resolve: {
      strategiePch: StrategiePchRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StrategiePchUpdateComponent,
    resolve: {
      strategiePch: StrategiePchRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StrategiePchUpdateComponent,
    resolve: {
      strategiePch: StrategiePchRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(strategiePchRoute)],
  exports: [RouterModule],
})
export class StrategiePchRoutingModule {}
