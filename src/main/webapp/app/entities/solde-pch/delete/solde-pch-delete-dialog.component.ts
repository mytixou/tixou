import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISoldePch } from '../solde-pch.model';
import { SoldePchService } from '../service/solde-pch.service';

@Component({
  templateUrl: './solde-pch-delete-dialog.component.html',
})
export class SoldePchDeleteDialogComponent {
  soldePch?: ISoldePch;

  constructor(protected soldePchService: SoldePchService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.soldePchService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
