import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConsommationPchEComponent } from './list/consommation-pch-e.component';
import { ConsommationPchEDetailComponent } from './detail/consommation-pch-e-detail.component';
import { ConsommationPchEUpdateComponent } from './update/consommation-pch-e-update.component';
import { ConsommationPchEDeleteDialogComponent } from './delete/consommation-pch-e-delete-dialog.component';
import { ConsommationPchERoutingModule } from './route/consommation-pch-e-routing.module';

@NgModule({
  imports: [SharedModule, ConsommationPchERoutingModule],
  declarations: [
    ConsommationPchEComponent,
    ConsommationPchEDetailComponent,
    ConsommationPchEUpdateComponent,
    ConsommationPchEDeleteDialogComponent,
  ],
  entryComponents: [ConsommationPchEDeleteDialogComponent],
})
export class ConsommationPchEModule {}
