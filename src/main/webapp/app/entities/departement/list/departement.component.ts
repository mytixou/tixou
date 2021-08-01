import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartement } from '../departement.model';
import { DepartementService } from '../service/departement.service';
import { DepartementDeleteDialogComponent } from '../delete/departement-delete-dialog.component';

@Component({
  selector: 'jhi-departement',
  templateUrl: './departement.component.html',
})
export class DepartementComponent implements OnInit {
  departements?: IDepartement[];
  isLoading = false;

  constructor(protected departementService: DepartementService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.departementService.query().subscribe(
      (res: HttpResponse<IDepartement[]>) => {
        this.isLoading = false;
        this.departements = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDepartement): number {
    return item.id!;
  }

  delete(departement: IDepartement): void {
    const modalRef = this.modalService.open(DepartementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.departement = departement;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
