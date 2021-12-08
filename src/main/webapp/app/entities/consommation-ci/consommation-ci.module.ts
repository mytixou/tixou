import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConsommationCiComponent } from './list/consommation-ci.component';
import { ConsommationCiDetailComponent } from './detail/consommation-ci-detail.component';
import { ConsommationCiUpdateComponent } from './update/consommation-ci-update.component';
import { ConsommationCiDeleteDialogComponent } from './delete/consommation-ci-delete-dialog.component';
import { ConsommationCiRoutingModule } from './route/consommation-ci-routing.module';

@NgModule({
  imports: [SharedModule, ConsommationCiRoutingModule],
  declarations: [
    ConsommationCiComponent,
    ConsommationCiDetailComponent,
    ConsommationCiUpdateComponent,
    ConsommationCiDeleteDialogComponent,
  ],
  entryComponents: [ConsommationCiDeleteDialogComponent],
})
export class ConsommationCiModule {}
