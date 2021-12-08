import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITiersFinanceur } from '../tiers-financeur.model';
import { TiersFinanceurService } from '../service/tiers-financeur.service';

@Component({
  templateUrl: './tiers-financeur-delete-dialog.component.html',
})
export class TiersFinanceurDeleteDialogComponent {
  tiersFinanceur?: ITiersFinanceur;

  constructor(protected tiersFinanceurService: TiersFinanceurService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tiersFinanceurService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
