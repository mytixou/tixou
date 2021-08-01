import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RefContrainteComponent } from '../list/ref-contrainte.component';
import { RefContrainteDetailComponent } from '../detail/ref-contrainte-detail.component';
import { RefContrainteUpdateComponent } from '../update/ref-contrainte-update.component';
import { RefContrainteRoutingResolveService } from './ref-contrainte-routing-resolve.service';

const refContrainteRoute: Routes = [
  {
    path: '',
    component: RefContrainteComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RefContrainteDetailComponent,
    resolve: {
      refContrainte: RefContrainteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RefContrainteUpdateComponent,
    resolve: {
      refContrainte: RefContrainteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RefContrainteUpdateComponent,
    resolve: {
      refContrainte: RefContrainteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(refContrainteRoute)],
  exports: [RouterModule],
})
export class RefContrainteRoutingModule {}
