import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INatureActivite } from '../nature-activite.model';
import { NatureActiviteService } from '../service/nature-activite.service';
import { NatureActiviteDeleteDialogComponent } from '../delete/nature-activite-delete-dialog.component';

@Component({
  selector: 'jhi-nature-activite',
  templateUrl: './nature-activite.component.html',
})
export class NatureActiviteComponent implements OnInit {
  natureActivites?: INatureActivite[];
  isLoading = false;

  constructor(protected natureActiviteService: NatureActiviteService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.natureActiviteService.query().subscribe(
      (res: HttpResponse<INatureActivite[]>) => {
        this.isLoading = false;
        this.natureActivites = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: INatureActivite): number {
    return item.id!;
  }

  delete(natureActivite: INatureActivite): void {
    const modalRef = this.modalService.open(NatureActiviteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.natureActivite = natureActivite;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
