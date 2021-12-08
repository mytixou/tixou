import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SoldePchEComponent } from './list/solde-pch-e.component';
import { SoldePchEDetailComponent } from './detail/solde-pch-e-detail.component';
import { SoldePchEUpdateComponent } from './update/solde-pch-e-update.component';
import { SoldePchEDeleteDialogComponent } from './delete/solde-pch-e-delete-dialog.component';
import { SoldePchERoutingModule } from './route/solde-pch-e-routing.module';

@NgModule({
  imports: [SharedModule, SoldePchERoutingModule],
  declarations: [SoldePchEComponent, SoldePchEDetailComponent, SoldePchEUpdateComponent, SoldePchEDeleteDialogComponent],
  entryComponents: [SoldePchEDeleteDialogComponent],
})
export class SoldePchEModule {}
