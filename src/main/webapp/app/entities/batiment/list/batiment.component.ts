import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBatiment } from '../batiment.model';
import { BatimentService } from '../service/batiment.service';
import { BatimentDeleteDialogComponent } from '../delete/batiment-delete-dialog.component';

@Component({
  selector: 'jhi-batiment',
  templateUrl: './batiment.component.html',
})
export class BatimentComponent implements OnInit {
  batiments?: IBatiment[];
  isLoading = false;

  constructor(protected batimentService: BatimentService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.batimentService.query().subscribe(
      (res: HttpResponse<IBatiment[]>) => {
        this.isLoading = false;
        this.batiments = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IBatiment): number {
    return item.id!;
  }

  delete(batiment: IBatiment): void {
    const modalRef = this.modalService.open(BatimentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.batiment = batiment;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
