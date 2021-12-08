import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INatureMontant } from '../nature-montant.model';
import { NatureMontantService } from '../service/nature-montant.service';
import { NatureMontantDeleteDialogComponent } from '../delete/nature-montant-delete-dialog.component';

@Component({
  selector: 'jhi-nature-montant',
  templateUrl: './nature-montant.component.html',
})
export class NatureMontantComponent implements OnInit {
  natureMontants?: INatureMontant[];
  isLoading = false;

  constructor(protected natureMontantService: NatureMontantService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.natureMontantService.query().subscribe(
      (res: HttpResponse<INatureMontant[]>) => {
        this.isLoading = false;
        this.natureMontants = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: INatureMontant): number {
    return item.id!;
  }

  delete(natureMontant: INatureMontant): void {
    const modalRef = this.modalService.open(NatureMontantDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.natureMontant = natureMontant;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
