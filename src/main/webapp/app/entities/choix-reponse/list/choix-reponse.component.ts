import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChoixReponse } from '../choix-reponse.model';
import { ChoixReponseService } from '../service/choix-reponse.service';
import { ChoixReponseDeleteDialogComponent } from '../delete/choix-reponse-delete-dialog.component';

@Component({
  selector: 'jhi-choix-reponse',
  templateUrl: './choix-reponse.component.html',
})
export class ChoixReponseComponent implements OnInit {
  choixReponses?: IChoixReponse[];
  isLoading = false;

  constructor(protected choixReponseService: ChoixReponseService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.choixReponseService.query().subscribe(
      (res: HttpResponse<IChoixReponse[]>) => {
        this.isLoading = false;
        this.choixReponses = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IChoixReponse): number {
    return item.id!;
  }

  delete(choixReponse: IChoixReponse): void {
    const modalRef = this.modalService.open(ChoixReponseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.choixReponse = choixReponse;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
