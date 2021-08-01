import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CommanditaireComponent } from '../list/commanditaire.component';
import { CommanditaireDetailComponent } from '../detail/commanditaire-detail.component';
import { CommanditaireUpdateComponent } from '../update/commanditaire-update.component';
import { CommanditaireRoutingResolveService } from './commanditaire-routing-resolve.service';

const commanditaireRoute: Routes = [
  {
    path: '',
    component: CommanditaireComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CommanditaireDetailComponent,
    resolve: {
      commanditaire: CommanditaireRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CommanditaireUpdateComponent,
    resolve: {
      commanditaire: CommanditaireRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CommanditaireUpdateComponent,
    resolve: {
      commanditaire: CommanditaireRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(commanditaireRoute)],
  exports: [RouterModule],
})
export class CommanditaireRoutingModule {}
