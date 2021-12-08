import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SoldePchComponent } from './list/solde-pch.component';
import { SoldePchDetailComponent } from './detail/solde-pch-detail.component';
import { SoldePchUpdateComponent } from './update/solde-pch-update.component';
import { SoldePchDeleteDialogComponent } from './delete/solde-pch-delete-dialog.component';
import { SoldePchRoutingModule } from './route/solde-pch-routing.module';

@NgModule({
  imports: [SharedModule, SoldePchRoutingModule],
  declarations: [SoldePchComponent, SoldePchDetailComponent, SoldePchUpdateComponent, SoldePchDeleteDialogComponent],
  entryComponents: [SoldePchDeleteDialogComponent],
})
export class SoldePchModule {}
