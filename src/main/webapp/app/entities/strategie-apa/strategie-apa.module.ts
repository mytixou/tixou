import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StrategieApaComponent } from './list/strategie-apa.component';
import { StrategieApaDetailComponent } from './detail/strategie-apa-detail.component';
import { StrategieApaUpdateComponent } from './update/strategie-apa-update.component';
import { StrategieApaDeleteDialogComponent } from './delete/strategie-apa-delete-dialog.component';
import { StrategieApaRoutingModule } from './route/strategie-apa-routing.module';

@NgModule({
  imports: [SharedModule, StrategieApaRoutingModule],
  declarations: [StrategieApaComponent, StrategieApaDetailComponent, StrategieApaUpdateComponent, StrategieApaDeleteDialogComponent],
  entryComponents: [StrategieApaDeleteDialogComponent],
})
export class StrategieApaModule {}
