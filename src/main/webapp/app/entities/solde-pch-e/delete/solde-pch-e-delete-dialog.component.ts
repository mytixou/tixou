import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISoldePchE } from '../solde-pch-e.model';
import { SoldePchEService } from '../service/solde-pch-e.service';

@Component({
  templateUrl: './solde-pch-e-delete-dialog.component.html',
})
export class SoldePchEDeleteDialogComponent {
  soldePchE?: ISoldePchE;

  constructor(protected soldePchEService: SoldePchEService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.soldePchEService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
