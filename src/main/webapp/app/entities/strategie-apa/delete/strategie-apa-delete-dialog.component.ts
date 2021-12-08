import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStrategieApa } from '../strategie-apa.model';
import { StrategieApaService } from '../service/strategie-apa.service';

@Component({
  templateUrl: './strategie-apa-delete-dialog.component.html',
})
export class StrategieApaDeleteDialogComponent {
  strategieApa?: IStrategieApa;

  constructor(protected strategieApaService: StrategieApaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.strategieApaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
