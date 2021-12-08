import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISoldeApa } from '../solde-apa.model';
import { SoldeApaService } from '../service/solde-apa.service';
import { SoldeApaDeleteDialogComponent } from '../delete/solde-apa-delete-dialog.component';

@Component({
  selector: 'jhi-solde-apa',
  templateUrl: './solde-apa.component.html',
})
export class SoldeApaComponent implements OnInit {
  soldeApas?: ISoldeApa[];
  isLoading = false;

  constructor(protected soldeApaService: SoldeApaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.soldeApaService.query().subscribe(
      (res: HttpResponse<ISoldeApa[]>) => {
        this.isLoading = false;
        this.soldeApas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISoldeApa): number {
    return item.id!;
  }

  delete(soldeApa: ISoldeApa): void {
    const modalRef = this.modalService.open(SoldeApaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.soldeApa = soldeApa;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
