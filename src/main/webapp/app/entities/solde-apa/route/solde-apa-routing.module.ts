import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SoldeApaComponent } from '../list/solde-apa.component';
import { SoldeApaDetailComponent } from '../detail/solde-apa-detail.component';
import { SoldeApaUpdateComponent } from '../update/solde-apa-update.component';
import { SoldeApaRoutingResolveService } from './solde-apa-routing-resolve.service';

const soldeApaRoute: Routes = [
  {
    path: '',
    component: SoldeApaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SoldeApaDetailComponent,
    resolve: {
      soldeApa: SoldeApaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SoldeApaUpdateComponent,
    resolve: {
      soldeApa: SoldeApaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SoldeApaUpdateComponent,
    resolve: {
      soldeApa: SoldeApaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(soldeApaRoute)],
  exports: [RouterModule],
})
export class SoldeApaRoutingModule {}
