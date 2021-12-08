import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StrategieApaComponent } from '../list/strategie-apa.component';
import { StrategieApaDetailComponent } from '../detail/strategie-apa-detail.component';
import { StrategieApaUpdateComponent } from '../update/strategie-apa-update.component';
import { StrategieApaRoutingResolveService } from './strategie-apa-routing-resolve.service';

const strategieApaRoute: Routes = [
  {
    path: '',
    component: StrategieApaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StrategieApaDetailComponent,
    resolve: {
      strategieApa: StrategieApaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StrategieApaUpdateComponent,
    resolve: {
      strategieApa: StrategieApaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StrategieApaUpdateComponent,
    resolve: {
      strategieApa: StrategieApaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(strategieApaRoute)],
  exports: [RouterModule],
})
export class StrategieApaRoutingModule {}
