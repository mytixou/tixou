import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CommanditaireComponent } from './list/commanditaire.component';
import { CommanditaireDetailComponent } from './detail/commanditaire-detail.component';
import { CommanditaireUpdateComponent } from './update/commanditaire-update.component';
import { CommanditaireDeleteDialogComponent } from './delete/commanditaire-delete-dialog.component';
import { CommanditaireRoutingModule } from './route/commanditaire-routing.module';

@NgModule({
  imports: [SharedModule, CommanditaireRoutingModule],
  declarations: [CommanditaireComponent, CommanditaireDetailComponent, CommanditaireUpdateComponent, CommanditaireDeleteDialogComponent],
  entryComponents: [CommanditaireDeleteDialogComponent],
})
export class CommanditaireModule {}
