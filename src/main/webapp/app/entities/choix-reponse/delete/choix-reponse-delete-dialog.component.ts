import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IChoixReponse } from '../choix-reponse.model';
import { ChoixReponseService } from '../service/choix-reponse.service';

@Component({
  templateUrl: './choix-reponse-delete-dialog.component.html',
})
export class ChoixReponseDeleteDialogComponent {
  choixReponse?: IChoixReponse;

  constructor(protected choixReponseService: ChoixReponseService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.choixReponseService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
