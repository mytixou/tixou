import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StrategieCiComponent } from './list/strategie-ci.component';
import { StrategieCiDetailComponent } from './detail/strategie-ci-detail.component';
import { StrategieCiUpdateComponent } from './update/strategie-ci-update.component';
import { StrategieCiDeleteDialogComponent } from './delete/strategie-ci-delete-dialog.component';
import { StrategieCiRoutingModule } from './route/strategie-ci-routing.module';

@NgModule({
  imports: [SharedModule, StrategieCiRoutingModule],
  declarations: [StrategieCiComponent, StrategieCiDetailComponent, StrategieCiUpdateComponent, StrategieCiDeleteDialogComponent],
  entryComponents: [StrategieCiDeleteDialogComponent],
})
export class StrategieCiModule {}
