import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStrategiePchE } from '../strategie-pch-e.model';
import { StrategiePchEService } from '../service/strategie-pch-e.service';

@Component({
  templateUrl: './strategie-pch-e-delete-dialog.component.html',
})
export class StrategiePchEDeleteDialogComponent {
  strategiePchE?: IStrategiePchE;

  constructor(protected strategiePchEService: StrategiePchEService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.strategiePchEService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
