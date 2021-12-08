import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConsommationPchComponent } from '../list/consommation-pch.component';
import { ConsommationPchDetailComponent } from '../detail/consommation-pch-detail.component';
import { ConsommationPchUpdateComponent } from '../update/consommation-pch-update.component';
import { ConsommationPchRoutingResolveService } from './consommation-pch-routing-resolve.service';

const consommationPchRoute: Routes = [
  {
    path: '',
    component: ConsommationPchComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConsommationPchDetailComponent,
    resolve: {
      consommationPch: ConsommationPchRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConsommationPchUpdateComponent,
    resolve: {
      consommationPch: ConsommationPchRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConsommationPchUpdateComponent,
    resolve: {
      consommationPch: ConsommationPchRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(consommationPchRoute)],
  exports: [RouterModule],
})
export class ConsommationPchRoutingModule {}
