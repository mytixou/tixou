import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SoldeCiComponent } from './list/solde-ci.component';
import { SoldeCiDetailComponent } from './detail/solde-ci-detail.component';
import { SoldeCiUpdateComponent } from './update/solde-ci-update.component';
import { SoldeCiDeleteDialogComponent } from './delete/solde-ci-delete-dialog.component';
import { SoldeCiRoutingModule } from './route/solde-ci-routing.module';

@NgModule({
  imports: [SharedModule, SoldeCiRoutingModule],
  declarations: [SoldeCiComponent, SoldeCiDetailComponent, SoldeCiUpdateComponent, SoldeCiDeleteDialogComponent],
  entryComponents: [SoldeCiDeleteDialogComponent],
})
export class SoldeCiModule {}
