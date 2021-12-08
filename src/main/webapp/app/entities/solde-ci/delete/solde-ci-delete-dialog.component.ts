import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISoldeCi } from '../solde-ci.model';
import { SoldeCiService } from '../service/solde-ci.service';

@Component({
  templateUrl: './solde-ci-delete-dialog.component.html',
})
export class SoldeCiDeleteDialogComponent {
  soldeCi?: ISoldeCi;

  constructor(protected soldeCiService: SoldeCiService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.soldeCiService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
