import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStrategieCi } from '../strategie-ci.model';
import { StrategieCiService } from '../service/strategie-ci.service';

@Component({
  templateUrl: './strategie-ci-delete-dialog.component.html',
})
export class StrategieCiDeleteDialogComponent {
  strategieCi?: IStrategieCi;

  constructor(protected strategieCiService: StrategieCiService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.strategieCiService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
