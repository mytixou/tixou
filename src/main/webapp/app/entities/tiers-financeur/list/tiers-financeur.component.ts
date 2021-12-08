import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITiersFinanceur } from '../tiers-financeur.model';
import { TiersFinanceurService } from '../service/tiers-financeur.service';
import { TiersFinanceurDeleteDialogComponent } from '../delete/tiers-financeur-delete-dialog.component';

@Component({
  selector: 'jhi-tiers-financeur',
  templateUrl: './tiers-financeur.component.html',
})
export class TiersFinanceurComponent implements OnInit {
  tiersFinanceurs?: ITiersFinanceur[];
  isLoading = false;

  constructor(protected tiersFinanceurService: TiersFinanceurService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.tiersFinanceurService.query().subscribe(
      (res: HttpResponse<ITiersFinanceur[]>) => {
        this.isLoading = false;
        this.tiersFinanceurs = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITiersFinanceur): number {
    return item.id!;
  }

  delete(tiersFinanceur: ITiersFinanceur): void {
    const modalRef = this.modalService.open(TiersFinanceurDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tiersFinanceur = tiersFinanceur;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
