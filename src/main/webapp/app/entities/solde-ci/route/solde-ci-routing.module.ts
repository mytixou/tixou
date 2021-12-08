import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SoldeCiComponent } from '../list/solde-ci.component';
import { SoldeCiDetailComponent } from '../detail/solde-ci-detail.component';
import { SoldeCiUpdateComponent } from '../update/solde-ci-update.component';
import { SoldeCiRoutingResolveService } from './solde-ci-routing-resolve.service';

const soldeCiRoute: Routes = [
  {
    path: '',
    component: SoldeCiComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SoldeCiDetailComponent,
    resolve: {
      soldeCi: SoldeCiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SoldeCiUpdateComponent,
    resolve: {
      soldeCi: SoldeCiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SoldeCiUpdateComponent,
    resolve: {
      soldeCi: SoldeCiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(soldeCiRoute)],
  exports: [RouterModule],
})
export class SoldeCiRoutingModule {}
