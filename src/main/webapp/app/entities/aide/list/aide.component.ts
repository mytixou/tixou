import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAide } from '../aide.model';
import { AideService } from '../service/aide.service';
import { AideDeleteDialogComponent } from '../delete/aide-delete-dialog.component';

@Component({
  selector: 'jhi-aide',
  templateUrl: './aide.component.html',
})
export class AideComponent implements OnInit {
  aides?: IAide[];
  isLoading = false;

  constructor(protected aideService: AideService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.aideService.query().subscribe(
      (res: HttpResponse<IAide[]>) => {
        this.isLoading = false;
        this.aides = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAide): number {
    return item.id!;
  }

  delete(aide: IAide): void {
    const modalRef = this.modalService.open(AideDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.aide = aide;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
