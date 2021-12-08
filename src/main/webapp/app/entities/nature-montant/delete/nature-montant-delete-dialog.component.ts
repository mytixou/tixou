import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INatureMontant } from '../nature-montant.model';
import { NatureMontantService } from '../service/nature-montant.service';

@Component({
  templateUrl: './nature-montant-delete-dialog.component.html',
})
export class NatureMontantDeleteDialogComponent {
  natureMontant?: INatureMontant;

  constructor(protected natureMontantService: NatureMontantService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.natureMontantService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
