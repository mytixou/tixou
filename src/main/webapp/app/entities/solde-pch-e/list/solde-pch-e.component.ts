import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISoldePchE } from '../solde-pch-e.model';
import { SoldePchEService } from '../service/solde-pch-e.service';
import { SoldePchEDeleteDialogComponent } from '../delete/solde-pch-e-delete-dialog.component';

@Component({
  selector: 'jhi-solde-pch-e',
  templateUrl: './solde-pch-e.component.html',
})
export class SoldePchEComponent implements OnInit {
  soldePchES?: ISoldePchE[];
  isLoading = false;

  constructor(protected soldePchEService: SoldePchEService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.soldePchEService.query().subscribe(
      (res: HttpResponse<ISoldePchE[]>) => {
        this.isLoading = false;
        this.soldePchES = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISoldePchE): number {
    return item.id!;
  }

  delete(soldePchE: ISoldePchE): void {
    const modalRef = this.modalService.open(SoldePchEDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.soldePchE = soldePchE;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
