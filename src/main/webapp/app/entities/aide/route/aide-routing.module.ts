import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AideComponent } from '../list/aide.component';
import { AideDetailComponent } from '../detail/aide-detail.component';
import { AideUpdateComponent } from '../update/aide-update.component';
import { AideRoutingResolveService } from './aide-routing-resolve.service';

const aideRoute: Routes = [
  {
    path: '',
    component: AideComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AideDetailComponent,
    resolve: {
      aide: AideRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AideUpdateComponent,
    resolve: {
      aide: AideRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AideUpdateComponent,
    resolve: {
      aide: AideRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(aideRoute)],
  exports: [RouterModule],
})
export class AideRoutingModule {}
