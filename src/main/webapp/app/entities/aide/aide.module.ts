import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AideComponent } from './list/aide.component';
import { AideDetailComponent } from './detail/aide-detail.component';
import { AideUpdateComponent } from './update/aide-update.component';
import { AideDeleteDialogComponent } from './delete/aide-delete-dialog.component';
import { AideRoutingModule } from './route/aide-routing.module';

@NgModule({
  imports: [SharedModule, AideRoutingModule],
  declarations: [AideComponent, AideDetailComponent, AideUpdateComponent, AideDeleteDialogComponent],
  entryComponents: [AideDeleteDialogComponent],
})
export class AideModule {}
