import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsommationCi } from '../consommation-ci.model';
import { ConsommationCiService } from '../service/consommation-ci.service';

@Component({
  templateUrl: './consommation-ci-delete-dialog.component.html',
})
export class ConsommationCiDeleteDialogComponent {
  consommationCi?: IConsommationCi;

  constructor(protected consommationCiService: ConsommationCiService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.consommationCiService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
