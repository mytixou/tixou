import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RefContrainteComponent } from './list/ref-contrainte.component';
import { RefContrainteDetailComponent } from './detail/ref-contrainte-detail.component';
import { RefContrainteUpdateComponent } from './update/ref-contrainte-update.component';
import { RefContrainteDeleteDialogComponent } from './delete/ref-contrainte-delete-dialog.component';
import { RefContrainteRoutingModule } from './route/ref-contrainte-routing.module';

@NgModule({
  imports: [SharedModule, RefContrainteRoutingModule],
  declarations: [RefContrainteComponent, RefContrainteDetailComponent, RefContrainteUpdateComponent, RefContrainteDeleteDialogComponent],
  entryComponents: [RefContrainteDeleteDialogComponent],
})
export class RefContrainteModule {}
