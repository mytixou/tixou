import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICommanditaire } from '../commanditaire.model';
import { CommanditaireService } from '../service/commanditaire.service';
import { CommanditaireDeleteDialogComponent } from '../delete/commanditaire-delete-dialog.component';

@Component({
  selector: 'jhi-commanditaire',
  templateUrl: './commanditaire.component.html',
})
export class CommanditaireComponent implements OnInit {
  commanditaires?: ICommanditaire[];
  isLoading = false;

  constructor(protected commanditaireService: CommanditaireService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.commanditaireService.query().subscribe(
      (res: HttpResponse<ICommanditaire[]>) => {
        this.isLoading = false;
        this.commanditaires = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICommanditaire): number {
    return item.id!;
  }

  delete(commanditaire: ICommanditaire): void {
    const modalRef = this.modalService.open(CommanditaireDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.commanditaire = commanditaire;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
