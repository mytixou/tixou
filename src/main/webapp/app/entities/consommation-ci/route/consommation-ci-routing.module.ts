import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConsommationCiComponent } from '../list/consommation-ci.component';
import { ConsommationCiDetailComponent } from '../detail/consommation-ci-detail.component';
import { ConsommationCiUpdateComponent } from '../update/consommation-ci-update.component';
import { ConsommationCiRoutingResolveService } from './consommation-ci-routing-resolve.service';

const consommationCiRoute: Routes = [
  {
    path: '',
    component: ConsommationCiComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConsommationCiDetailComponent,
    resolve: {
      consommationCi: ConsommationCiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConsommationCiUpdateComponent,
    resolve: {
      consommationCi: ConsommationCiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConsommationCiUpdateComponent,
    resolve: {
      consommationCi: ConsommationCiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(consommationCiRoute)],
  exports: [RouterModule],
})
export class ConsommationCiRoutingModule {}
