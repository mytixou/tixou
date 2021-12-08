import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStrategiePch } from '../strategie-pch.model';
import { StrategiePchService } from '../service/strategie-pch.service';
import { StrategiePchDeleteDialogComponent } from '../delete/strategie-pch-delete-dialog.component';

@Component({
  selector: 'jhi-strategie-pch',
  templateUrl: './strategie-pch.component.html',
})
export class StrategiePchComponent implements OnInit {
  strategiePches?: IStrategiePch[];
  isLoading = false;

  constructor(protected strategiePchService: StrategiePchService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.strategiePchService.query().subscribe(
      (res: HttpResponse<IStrategiePch[]>) => {
        this.isLoading = false;
        this.strategiePches = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IStrategiePch): number {
    return item.id!;
  }

  delete(strategiePch: IStrategiePch): void {
    const modalRef = this.modalService.open(StrategiePchDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.strategiePch = strategiePch;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
