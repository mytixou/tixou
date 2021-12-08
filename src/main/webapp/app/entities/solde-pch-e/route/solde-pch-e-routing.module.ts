import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SoldePchEComponent } from '../list/solde-pch-e.component';
import { SoldePchEDetailComponent } from '../detail/solde-pch-e-detail.component';
import { SoldePchEUpdateComponent } from '../update/solde-pch-e-update.component';
import { SoldePchERoutingResolveService } from './solde-pch-e-routing-resolve.service';

const soldePchERoute: Routes = [
  {
    path: '',
    component: SoldePchEComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SoldePchEDetailComponent,
    resolve: {
      soldePchE: SoldePchERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SoldePchEUpdateComponent,
    resolve: {
      soldePchE: SoldePchERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SoldePchEUpdateComponent,
    resolve: {
      soldePchE: SoldePchERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(soldePchERoute)],
  exports: [RouterModule],
})
export class SoldePchERoutingModule {}
