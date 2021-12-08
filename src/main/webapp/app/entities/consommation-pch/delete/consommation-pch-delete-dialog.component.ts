import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsommationPch } from '../consommation-pch.model';
import { ConsommationPchService } from '../service/consommation-pch.service';

@Component({
  templateUrl: './consommation-pch-delete-dialog.component.html',
})
export class ConsommationPchDeleteDialogComponent {
  consommationPch?: IConsommationPch;

  constructor(protected consommationPchService: ConsommationPchService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.consommationPchService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
