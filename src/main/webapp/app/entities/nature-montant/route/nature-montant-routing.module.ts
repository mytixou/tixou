import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NatureMontantComponent } from '../list/nature-montant.component';
import { NatureMontantDetailComponent } from '../detail/nature-montant-detail.component';
import { NatureMontantUpdateComponent } from '../update/nature-montant-update.component';
import { NatureMontantRoutingResolveService } from './nature-montant-routing-resolve.service';

const natureMontantRoute: Routes = [
  {
    path: '',
    component: NatureMontantComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NatureMontantDetailComponent,
    resolve: {
      natureMontant: NatureMontantRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NatureMontantUpdateComponent,
    resolve: {
      natureMontant: NatureMontantRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NatureMontantUpdateComponent,
    resolve: {
      natureMontant: NatureMontantRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(natureMontantRoute)],
  exports: [RouterModule],
})
export class NatureMontantRoutingModule {}
