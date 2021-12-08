import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStrategiePch } from '../strategie-pch.model';
import { StrategiePchService } from '../service/strategie-pch.service';

@Component({
  templateUrl: './strategie-pch-delete-dialog.component.html',
})
export class StrategiePchDeleteDialogComponent {
  strategiePch?: IStrategiePch;

  constructor(protected strategiePchService: StrategiePchService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.strategiePchService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
