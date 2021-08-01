import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ChoixReponseComponent } from './list/choix-reponse.component';
import { ChoixReponseDetailComponent } from './detail/choix-reponse-detail.component';
import { ChoixReponseUpdateComponent } from './update/choix-reponse-update.component';
import { ChoixReponseDeleteDialogComponent } from './delete/choix-reponse-delete-dialog.component';
import { ChoixReponseRoutingModule } from './route/choix-reponse-routing.module';

@NgModule({
  imports: [SharedModule, ChoixReponseRoutingModule],
  declarations: [ChoixReponseComponent, ChoixReponseDetailComponent, ChoixReponseUpdateComponent, ChoixReponseDeleteDialogComponent],
  entryComponents: [ChoixReponseDeleteDialogComponent],
})
export class ChoixReponseModule {}
