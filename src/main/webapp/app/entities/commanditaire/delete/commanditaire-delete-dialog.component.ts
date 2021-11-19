import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICommanditaire } from '../commanditaire.model';
import { CommanditaireService } from '../service/commanditaire.service';

@Component({
  templateUrl: './commanditaire-delete-dialog.component.html',
})
export class CommanditaireDeleteDialogComponent {
  commanditaire?: ICommanditaire;

  constructor(protected commanditaireService: CommanditaireService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.commanditaireService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
