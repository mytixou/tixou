import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStrategieApa } from '../strategie-apa.model';
import { StrategieApaService } from '../service/strategie-apa.service';
import { StrategieApaDeleteDialogComponent } from '../delete/strategie-apa-delete-dialog.component';

@Component({
  selector: 'jhi-strategie-apa',
  templateUrl: './strategie-apa.component.html',
})
export class StrategieApaComponent implements OnInit {
  strategieApas?: IStrategieApa[];
  isLoading = false;

  constructor(protected strategieApaService: StrategieApaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.strategieApaService.query().subscribe(
      (res: HttpResponse<IStrategieApa[]>) => {
        this.isLoading = false;
        this.strategieApas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IStrategieApa): number {
    return item.id!;
  }

  delete(strategieApa: IStrategieApa): void {
    const modalRef = this.modalService.open(StrategieApaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.strategieApa = strategieApa;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
