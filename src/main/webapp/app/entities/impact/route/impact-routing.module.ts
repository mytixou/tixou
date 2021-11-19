import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ImpactComponent } from '../list/impact.component';
import { ImpactDetailComponent } from '../detail/impact-detail.component';
import { ImpactUpdateComponent } from '../update/impact-update.component';
import { ImpactRoutingResolveService } from './impact-routing-resolve.service';

const impactRoute: Routes = [
  {
    path: '',
    component: ImpactComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ImpactDetailComponent,
    resolve: {
      impact: ImpactRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ImpactUpdateComponent,
    resolve: {
      impact: ImpactRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ImpactUpdateComponent,
    resolve: {
      impact: ImpactRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(impactRoute)],
  exports: [RouterModule],
})
export class ImpactRoutingModule {}
