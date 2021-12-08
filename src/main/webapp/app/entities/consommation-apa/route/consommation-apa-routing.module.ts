import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConsommationApaComponent } from '../list/consommation-apa.component';
import { ConsommationApaDetailComponent } from '../detail/consommation-apa-detail.component';
import { ConsommationApaUpdateComponent } from '../update/consommation-apa-update.component';
import { ConsommationApaRoutingResolveService } from './consommation-apa-routing-resolve.service';

const consommationApaRoute: Routes = [
  {
    path: '',
    component: ConsommationApaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConsommationApaDetailComponent,
    resolve: {
      consommationApa: ConsommationApaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConsommationApaUpdateComponent,
    resolve: {
      consommationApa: ConsommationApaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConsommationApaUpdateComponent,
    resolve: {
      consommationApa: ConsommationApaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(consommationApaRoute)],
  exports: [RouterModule],
})
export class ConsommationApaRoutingModule {}
