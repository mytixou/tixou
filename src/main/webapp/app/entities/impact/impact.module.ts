import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ImpactComponent } from './list/impact.component';
import { ImpactDetailComponent } from './detail/impact-detail.component';
import { ImpactUpdateComponent } from './update/impact-update.component';
import { ImpactDeleteDialogComponent } from './delete/impact-delete-dialog.component';
import { ImpactRoutingModule } from './route/impact-routing.module';

@NgModule({
  imports: [SharedModule, ImpactRoutingModule],
  declarations: [ImpactComponent, ImpactDetailComponent, ImpactUpdateComponent, ImpactDeleteDialogComponent],
  entryComponents: [ImpactDeleteDialogComponent],
})
export class ImpactModule {}
