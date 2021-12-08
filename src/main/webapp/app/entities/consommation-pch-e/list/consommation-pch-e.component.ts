import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsommationPchE } from '../consommation-pch-e.model';
import { ConsommationPchEService } from '../service/consommation-pch-e.service';
import { ConsommationPchEDeleteDialogComponent } from '../delete/consommation-pch-e-delete-dialog.component';

@Component({
  selector: 'jhi-consommation-pch-e',
  templateUrl: './consommation-pch-e.component.html',
})
export class ConsommationPchEComponent implements OnInit {
  consommationPchES?: IConsommationPchE[];
  isLoading = false;

  constructor(protected consommationPchEService: ConsommationPchEService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.consommationPchEService.query().subscribe(
      (res: HttpResponse<IConsommationPchE[]>) => {
        this.isLoading = false;
        this.consommationPchES = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IConsommationPchE): number {
    return item.id!;
  }

  delete(consommationPchE: IConsommationPchE): void {
    const modalRef = this.modalService.open(ConsommationPchEDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.consommationPchE = consommationPchE;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
