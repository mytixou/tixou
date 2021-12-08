import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TiersFinanceurComponent } from './list/tiers-financeur.component';
import { TiersFinanceurDetailComponent } from './detail/tiers-financeur-detail.component';
import { TiersFinanceurUpdateComponent } from './update/tiers-financeur-update.component';
import { TiersFinanceurDeleteDialogComponent } from './delete/tiers-financeur-delete-dialog.component';
import { TiersFinanceurRoutingModule } from './route/tiers-financeur-routing.module';

@NgModule({
  imports: [SharedModule, TiersFinanceurRoutingModule],
  declarations: [
    TiersFinanceurComponent,
    TiersFinanceurDetailComponent,
    TiersFinanceurUpdateComponent,
    TiersFinanceurDeleteDialogComponent,
  ],
  entryComponents: [TiersFinanceurDeleteDialogComponent],
})
export class TiersFinanceurModule {}
