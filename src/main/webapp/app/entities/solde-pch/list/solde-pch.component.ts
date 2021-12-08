import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISoldePch } from '../solde-pch.model';
import { SoldePchService } from '../service/solde-pch.service';
import { SoldePchDeleteDialogComponent } from '../delete/solde-pch-delete-dialog.component';

@Component({
  selector: 'jhi-solde-pch',
  templateUrl: './solde-pch.component.html',
})
export class SoldePchComponent implements OnInit {
  soldePches?: ISoldePch[];
  isLoading = false;

  constructor(protected soldePchService: SoldePchService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.soldePchService.query().subscribe(
      (res: HttpResponse<ISoldePch[]>) => {
        this.isLoading = false;
        this.soldePches = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISoldePch): number {
    return item.id!;
  }

  delete(soldePch: ISoldePch): void {
    const modalRef = this.modalService.open(SoldePchDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.soldePch = soldePch;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
