import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConsommationPchEComponent } from '../list/consommation-pch-e.component';
import { ConsommationPchEDetailComponent } from '../detail/consommation-pch-e-detail.component';
import { ConsommationPchEUpdateComponent } from '../update/consommation-pch-e-update.component';
import { ConsommationPchERoutingResolveService } from './consommation-pch-e-routing-resolve.service';

const consommationPchERoute: Routes = [
  {
    path: '',
    component: ConsommationPchEComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConsommationPchEDetailComponent,
    resolve: {
      consommationPchE: ConsommationPchERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConsommationPchEUpdateComponent,
    resolve: {
      consommationPchE: ConsommationPchERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConsommationPchEUpdateComponent,
    resolve: {
      consommationPchE: ConsommationPchERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(consommationPchERoute)],
  exports: [RouterModule],
})
export class ConsommationPchERoutingModule {}
