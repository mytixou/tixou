import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsommationApa } from '../consommation-apa.model';
import { ConsommationApaService } from '../service/consommation-apa.service';
import { ConsommationApaDeleteDialogComponent } from '../delete/consommation-apa-delete-dialog.component';

@Component({
  selector: 'jhi-consommation-apa',
  templateUrl: './consommation-apa.component.html',
})
export class ConsommationApaComponent implements OnInit {
  consommationApas?: IConsommationApa[];
  isLoading = false;

  constructor(protected consommationApaService: ConsommationApaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.consommationApaService.query().subscribe(
      (res: HttpResponse<IConsommationApa[]>) => {
        this.isLoading = false;
        this.consommationApas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IConsommationApa): number {
    return item.id!;
  }

  delete(consommationApa: IConsommationApa): void {
    const modalRef = this.modalService.open(ConsommationApaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.consommationApa = consommationApa;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
