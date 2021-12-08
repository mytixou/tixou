import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISoldeCi } from '../solde-ci.model';
import { SoldeCiService } from '../service/solde-ci.service';
import { SoldeCiDeleteDialogComponent } from '../delete/solde-ci-delete-dialog.component';

@Component({
  selector: 'jhi-solde-ci',
  templateUrl: './solde-ci.component.html',
})
export class SoldeCiComponent implements OnInit {
  soldeCis?: ISoldeCi[];
  isLoading = false;

  constructor(protected soldeCiService: SoldeCiService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.soldeCiService.query().subscribe(
      (res: HttpResponse<ISoldeCi[]>) => {
        this.isLoading = false;
        this.soldeCis = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISoldeCi): number {
    return item.id!;
  }

  delete(soldeCi: ISoldeCi): void {
    const modalRef = this.modalService.open(SoldeCiDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.soldeCi = soldeCi;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
