import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StrategiePchComponent } from './list/strategie-pch.component';
import { StrategiePchDetailComponent } from './detail/strategie-pch-detail.component';
import { StrategiePchUpdateComponent } from './update/strategie-pch-update.component';
import { StrategiePchDeleteDialogComponent } from './delete/strategie-pch-delete-dialog.component';
import { StrategiePchRoutingModule } from './route/strategie-pch-routing.module';

@NgModule({
  imports: [SharedModule, StrategiePchRoutingModule],
  declarations: [StrategiePchComponent, StrategiePchDetailComponent, StrategiePchUpdateComponent, StrategiePchDeleteDialogComponent],
  entryComponents: [StrategiePchDeleteDialogComponent],
})
export class StrategiePchModule {}
