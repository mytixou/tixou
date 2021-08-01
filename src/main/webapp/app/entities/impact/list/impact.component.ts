import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IImpact } from '../impact.model';
import { ImpactService } from '../service/impact.service';
import { ImpactDeleteDialogComponent } from '../delete/impact-delete-dialog.component';

@Component({
  selector: 'jhi-impact',
  templateUrl: './impact.component.html',
})
export class ImpactComponent implements OnInit {
  impacts?: IImpact[];
  isLoading = false;

  constructor(protected impactService: ImpactService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.impactService.query().subscribe(
      (res: HttpResponse<IImpact[]>) => {
        this.isLoading = false;
        this.impacts = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IImpact): number {
    return item.id!;
  }

  delete(impact: IImpact): void {
    const modalRef = this.modalService.open(ImpactDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.impact = impact;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
