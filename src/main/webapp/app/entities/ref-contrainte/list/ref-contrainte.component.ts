import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRefContrainte } from '../ref-contrainte.model';
import { RefContrainteService } from '../service/ref-contrainte.service';
import { RefContrainteDeleteDialogComponent } from '../delete/ref-contrainte-delete-dialog.component';

@Component({
  selector: 'jhi-ref-contrainte',
  templateUrl: './ref-contrainte.component.html',
})
export class RefContrainteComponent implements OnInit {
  refContraintes?: IRefContrainte[];
  isLoading = false;

  constructor(protected refContrainteService: RefContrainteService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.refContrainteService.query().subscribe(
      (res: HttpResponse<IRefContrainte[]>) => {
        this.isLoading = false;
        this.refContraintes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IRefContrainte): number {
    return item.id!;
  }

  delete(refContrainte: IRefContrainte): void {
    const modalRef = this.modalService.open(RefContrainteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.refContrainte = refContrainte;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
