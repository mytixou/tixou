import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStrategieCi } from '../strategie-ci.model';
import { StrategieCiService } from '../service/strategie-ci.service';
import { StrategieCiDeleteDialogComponent } from '../delete/strategie-ci-delete-dialog.component';

@Component({
  selector: 'jhi-strategie-ci',
  templateUrl: './strategie-ci.component.html',
})
export class StrategieCiComponent implements OnInit {
  strategieCis?: IStrategieCi[];
  isLoading = false;

  constructor(protected strategieCiService: StrategieCiService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.strategieCiService.query().subscribe(
      (res: HttpResponse<IStrategieCi[]>) => {
        this.isLoading = false;
        this.strategieCis = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IStrategieCi): number {
    return item.id!;
  }

  delete(strategieCi: IStrategieCi): void {
    const modalRef = this.modalService.open(StrategieCiDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.strategieCi = strategieCi;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
