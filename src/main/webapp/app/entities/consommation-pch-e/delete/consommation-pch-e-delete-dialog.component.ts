import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsommationPchE } from '../consommation-pch-e.model';
import { ConsommationPchEService } from '../service/consommation-pch-e.service';

@Component({
  templateUrl: './consommation-pch-e-delete-dialog.component.html',
})
export class ConsommationPchEDeleteDialogComponent {
  consommationPchE?: IConsommationPchE;

  constructor(protected consommationPchEService: ConsommationPchEService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.consommationPchEService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
