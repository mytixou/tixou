import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsommationPch } from '../consommation-pch.model';
import { ConsommationPchService } from '../service/consommation-pch.service';
import { ConsommationPchDeleteDialogComponent } from '../delete/consommation-pch-delete-dialog.component';

@Component({
  selector: 'jhi-consommation-pch',
  templateUrl: './consommation-pch.component.html',
})
export class ConsommationPchComponent implements OnInit {
  consommationPches?: IConsommationPch[];
  isLoading = false;

  constructor(protected consommationPchService: ConsommationPchService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.consommationPchService.query().subscribe(
      (res: HttpResponse<IConsommationPch[]>) => {
        this.isLoading = false;
        this.consommationPches = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IConsommationPch): number {
    return item.id!;
  }

  delete(consommationPch: IConsommationPch): void {
    const modalRef = this.modalService.open(ConsommationPchDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.consommationPch = consommationPch;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
