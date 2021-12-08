import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SoldePchComponent } from '../list/solde-pch.component';
import { SoldePchDetailComponent } from '../detail/solde-pch-detail.component';
import { SoldePchUpdateComponent } from '../update/solde-pch-update.component';
import { SoldePchRoutingResolveService } from './solde-pch-routing-resolve.service';

const soldePchRoute: Routes = [
  {
    path: '',
    component: SoldePchComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SoldePchDetailComponent,
    resolve: {
      soldePch: SoldePchRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SoldePchUpdateComponent,
    resolve: {
      soldePch: SoldePchRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SoldePchUpdateComponent,
    resolve: {
      soldePch: SoldePchRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(soldePchRoute)],
  exports: [RouterModule],
})
export class SoldePchRoutingModule {}
