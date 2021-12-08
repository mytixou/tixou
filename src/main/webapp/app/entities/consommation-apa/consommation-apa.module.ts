import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConsommationApaComponent } from './list/consommation-apa.component';
import { ConsommationApaDetailComponent } from './detail/consommation-apa-detail.component';
import { ConsommationApaUpdateComponent } from './update/consommation-apa-update.component';
import { ConsommationApaDeleteDialogComponent } from './delete/consommation-apa-delete-dialog.component';
import { ConsommationApaRoutingModule } from './route/consommation-apa-routing.module';

@NgModule({
  imports: [SharedModule, ConsommationApaRoutingModule],
  declarations: [
    ConsommationApaComponent,
    ConsommationApaDetailComponent,
    ConsommationApaUpdateComponent,
    ConsommationApaDeleteDialogComponent,
  ],
  entryComponents: [ConsommationApaDeleteDialogComponent],
})
export class ConsommationApaModule {}
