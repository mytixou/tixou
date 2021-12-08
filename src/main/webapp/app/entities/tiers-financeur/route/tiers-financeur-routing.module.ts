import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TiersFinanceurComponent } from '../list/tiers-financeur.component';
import { TiersFinanceurDetailComponent } from '../detail/tiers-financeur-detail.component';
import { TiersFinanceurUpdateComponent } from '../update/tiers-financeur-update.component';
import { TiersFinanceurRoutingResolveService } from './tiers-financeur-routing-resolve.service';

const tiersFinanceurRoute: Routes = [
  {
    path: '',
    component: TiersFinanceurComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TiersFinanceurDetailComponent,
    resolve: {
      tiersFinanceur: TiersFinanceurRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TiersFinanceurUpdateComponent,
    resolve: {
      tiersFinanceur: TiersFinanceurRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TiersFinanceurUpdateComponent,
    resolve: {
      tiersFinanceur: TiersFinanceurRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tiersFinanceurRoute)],
  exports: [RouterModule],
})
export class TiersFinanceurRoutingModule {}
