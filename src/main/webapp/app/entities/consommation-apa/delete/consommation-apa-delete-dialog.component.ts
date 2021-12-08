import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsommationApa } from '../consommation-apa.model';
import { ConsommationApaService } from '../service/consommation-apa.service';

@Component({
  templateUrl: './consommation-apa-delete-dialog.component.html',
})
export class ConsommationApaDeleteDialogComponent {
  consommationApa?: IConsommationApa;

  constructor(protected consommationApaService: ConsommationApaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.consommationApaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
