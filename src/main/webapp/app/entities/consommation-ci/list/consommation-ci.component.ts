import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsommationCi } from '../consommation-ci.model';
import { ConsommationCiService } from '../service/consommation-ci.service';
import { ConsommationCiDeleteDialogComponent } from '../delete/consommation-ci-delete-dialog.component';

@Component({
  selector: 'jhi-consommation-ci',
  templateUrl: './consommation-ci.component.html',
})
export class ConsommationCiComponent implements OnInit {
  consommationCis?: IConsommationCi[];
  isLoading = false;

  constructor(protected consommationCiService: ConsommationCiService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.consommationCiService.query().subscribe(
      (res: HttpResponse<IConsommationCi[]>) => {
        this.isLoading = false;
        this.consommationCis = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IConsommationCi): number {
    return item.id!;
  }

  delete(consommationCi: IConsommationCi): void {
    const modalRef = this.modalService.open(ConsommationCiDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.consommationCi = consommationCi;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
