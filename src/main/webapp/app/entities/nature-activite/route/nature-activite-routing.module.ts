import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NatureActiviteComponent } from '../list/nature-activite.component';
import { NatureActiviteDetailComponent } from '../detail/nature-activite-detail.component';
import { NatureActiviteUpdateComponent } from '../update/nature-activite-update.component';
import { NatureActiviteRoutingResolveService } from './nature-activite-routing-resolve.service';

const natureActiviteRoute: Routes = [
  {
    path: '',
    component: NatureActiviteComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NatureActiviteDetailComponent,
    resolve: {
      natureActivite: NatureActiviteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NatureActiviteUpdateComponent,
    resolve: {
      natureActivite: NatureActiviteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NatureActiviteUpdateComponent,
    resolve: {
      natureActivite: NatureActiviteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(natureActiviteRoute)],
  exports: [RouterModule],
})
export class NatureActiviteRoutingModule {}
