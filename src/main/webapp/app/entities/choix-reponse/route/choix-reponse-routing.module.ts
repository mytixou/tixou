import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ChoixReponseComponent } from '../list/choix-reponse.component';
import { ChoixReponseDetailComponent } from '../detail/choix-reponse-detail.component';
import { ChoixReponseUpdateComponent } from '../update/choix-reponse-update.component';
import { ChoixReponseRoutingResolveService } from './choix-reponse-routing-resolve.service';

const choixReponseRoute: Routes = [
  {
    path: '',
    component: ChoixReponseComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChoixReponseDetailComponent,
    resolve: {
      choixReponse: ChoixReponseRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChoixReponseUpdateComponent,
    resolve: {
      choixReponse: ChoixReponseRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChoixReponseUpdateComponent,
    resolve: {
      choixReponse: ChoixReponseRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(choixReponseRoute)],
  exports: [RouterModule],
})
export class ChoixReponseRoutingModule {}
