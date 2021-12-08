import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAide } from '../aide.model';
import { AideService } from '../service/aide.service';

@Component({
  templateUrl: './aide-delete-dialog.component.html',
})
export class AideDeleteDialogComponent {
  aide?: IAide;

  constructor(protected aideService: AideService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.aideService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
