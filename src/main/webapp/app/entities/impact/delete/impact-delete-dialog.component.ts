import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IImpact } from '../impact.model';
import { ImpactService } from '../service/impact.service';

@Component({
  templateUrl: './impact-delete-dialog.component.html',
})
export class ImpactDeleteDialogComponent {
  impact?: IImpact;

  constructor(protected impactService: ImpactService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.impactService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
