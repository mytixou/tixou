import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStrategiePchE } from '../strategie-pch-e.model';
import { StrategiePchEService } from '../service/strategie-pch-e.service';
import { StrategiePchEDeleteDialogComponent } from '../delete/strategie-pch-e-delete-dialog.component';

@Component({
  selector: 'jhi-strategie-pch-e',
  templateUrl: './strategie-pch-e.component.html',
})
export class StrategiePchEComponent implements OnInit {
  strategiePchES?: IStrategiePchE[];
  isLoading = false;

  constructor(protected strategiePchEService: StrategiePchEService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.strategiePchEService.query().subscribe(
      (res: HttpResponse<IStrategiePchE[]>) => {
        this.isLoading = false;
        this.strategiePchES = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IStrategiePchE): number {
    return item.id!;
  }

  delete(strategiePchE: IStrategiePchE): void {
    const modalRef = this.modalService.open(StrategiePchEDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.strategiePchE = strategiePchE;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
