import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INatureActivite } from '../nature-activite.model';
import { NatureActiviteService } from '../service/nature-activite.service';

@Component({
  templateUrl: './nature-activite-delete-dialog.component.html',
})
export class NatureActiviteDeleteDialogComponent {
  natureActivite?: INatureActivite;

  constructor(protected natureActiviteService: NatureActiviteService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.natureActiviteService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
