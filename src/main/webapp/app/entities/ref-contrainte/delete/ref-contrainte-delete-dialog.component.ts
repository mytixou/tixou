import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRefContrainte } from '../ref-contrainte.model';
import { RefContrainteService } from '../service/ref-contrainte.service';

@Component({
  templateUrl: './ref-contrainte-delete-dialog.component.html',
})
export class RefContrainteDeleteDialogComponent {
  refContrainte?: IRefContrainte;

  constructor(protected refContrainteService: RefContrainteService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.refContrainteService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
