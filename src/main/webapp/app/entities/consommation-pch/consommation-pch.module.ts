import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConsommationPchComponent } from './list/consommation-pch.component';
import { ConsommationPchDetailComponent } from './detail/consommation-pch-detail.component';
import { ConsommationPchUpdateComponent } from './update/consommation-pch-update.component';
import { ConsommationPchDeleteDialogComponent } from './delete/consommation-pch-delete-dialog.component';
import { ConsommationPchRoutingModule } from './route/consommation-pch-routing.module';

@NgModule({
  imports: [SharedModule, ConsommationPchRoutingModule],
  declarations: [
    ConsommationPchComponent,
    ConsommationPchDetailComponent,
    ConsommationPchUpdateComponent,
    ConsommationPchDeleteDialogComponent,
  ],
  entryComponents: [ConsommationPchDeleteDialogComponent],
})
export class ConsommationPchModule {}
