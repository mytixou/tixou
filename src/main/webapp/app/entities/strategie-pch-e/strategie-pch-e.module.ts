import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StrategiePchEComponent } from './list/strategie-pch-e.component';
import { StrategiePchEDetailComponent } from './detail/strategie-pch-e-detail.component';
import { StrategiePchEUpdateComponent } from './update/strategie-pch-e-update.component';
import { StrategiePchEDeleteDialogComponent } from './delete/strategie-pch-e-delete-dialog.component';
import { StrategiePchERoutingModule } from './route/strategie-pch-e-routing.module';

@NgModule({
  imports: [SharedModule, StrategiePchERoutingModule],
  declarations: [StrategiePchEComponent, StrategiePchEDetailComponent, StrategiePchEUpdateComponent, StrategiePchEDeleteDialogComponent],
  entryComponents: [StrategiePchEDeleteDialogComponent],
})
export class StrategiePchEModule {}
