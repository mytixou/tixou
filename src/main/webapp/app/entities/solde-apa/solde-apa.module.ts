import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SoldeApaComponent } from './list/solde-apa.component';
import { SoldeApaDetailComponent } from './detail/solde-apa-detail.component';
import { SoldeApaUpdateComponent } from './update/solde-apa-update.component';
import { SoldeApaDeleteDialogComponent } from './delete/solde-apa-delete-dialog.component';
import { SoldeApaRoutingModule } from './route/solde-apa-routing.module';

@NgModule({
  imports: [SharedModule, SoldeApaRoutingModule],
  declarations: [SoldeApaComponent, SoldeApaDetailComponent, SoldeApaUpdateComponent, SoldeApaDeleteDialogComponent],
  entryComponents: [SoldeApaDeleteDialogComponent],
})
export class SoldeApaModule {}
