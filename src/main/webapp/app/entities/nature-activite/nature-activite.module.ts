import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NatureActiviteComponent } from './list/nature-activite.component';
import { NatureActiviteDetailComponent } from './detail/nature-activite-detail.component';
import { NatureActiviteUpdateComponent } from './update/nature-activite-update.component';
import { NatureActiviteDeleteDialogComponent } from './delete/nature-activite-delete-dialog.component';
import { NatureActiviteRoutingModule } from './route/nature-activite-routing.module';

@NgModule({
  imports: [SharedModule, NatureActiviteRoutingModule],
  declarations: [
    NatureActiviteComponent,
    NatureActiviteDetailComponent,
    NatureActiviteUpdateComponent,
    NatureActiviteDeleteDialogComponent,
  ],
  entryComponents: [NatureActiviteDeleteDialogComponent],
})
export class NatureActiviteModule {}
