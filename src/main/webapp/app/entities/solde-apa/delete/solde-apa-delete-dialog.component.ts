import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISoldeApa } from '../solde-apa.model';
import { SoldeApaService } from '../service/solde-apa.service';

@Component({
  templateUrl: './solde-apa-delete-dialog.component.html',
})
export class SoldeApaDeleteDialogComponent {
  soldeApa?: ISoldeApa;

  constructor(protected soldeApaService: SoldeApaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.soldeApaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
