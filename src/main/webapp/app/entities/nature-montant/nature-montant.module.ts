import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NatureMontantComponent } from './list/nature-montant.component';
import { NatureMontantDetailComponent } from './detail/nature-montant-detail.component';
import { NatureMontantUpdateComponent } from './update/nature-montant-update.component';
import { NatureMontantDeleteDialogComponent } from './delete/nature-montant-delete-dialog.component';
import { NatureMontantRoutingModule } from './route/nature-montant-routing.module';

@NgModule({
  imports: [SharedModule, NatureMontantRoutingModule],
  declarations: [NatureMontantComponent, NatureMontantDetailComponent, NatureMontantUpdateComponent, NatureMontantDeleteDialogComponent],
  entryComponents: [NatureMontantDeleteDialogComponent],
})
export class NatureMontantModule {}
