import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProprietaire } from '../proprietaire.model';

import { ASC, DESC, ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { ProprietaireService } from '../service/proprietaire.service';
import { ProprietaireDeleteDialogComponent } from '../delete/proprietaire-delete-dialog.component';
import { ParseLinks } from 'app/core/util/parse-links.service';

@Component({
  selector: 'jhi-proprietaire',
  templateUrl: './proprietaire.component.html',
})
export class ProprietaireComponent implements OnInit {
  proprietaires: IProprietaire[];
  isLoading = false;
  itemsPerPage: number;
  links: { [key: string]: number };
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(protected proprietaireService: ProprietaireService, protected modalService: NgbModal, protected parseLinks: ParseLinks) {
    this.proprietaires = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.isLoading = true;

    this.proprietaireService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IProprietaire[]>) => {
          this.isLoading = false;
          this.paginateProprietaires(res.body, res.headers);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  reset(): void {
    this.page = 0;
    this.proprietaires = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IProprietaire): number {
    return item.id!;
  }

  delete(proprietaire: IProprietaire): void {
    const modalRef = this.modalService.open(ProprietaireDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.proprietaire = proprietaire;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.reset();
      }
    });
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateProprietaires(data: IProprietaire[] | null, headers: HttpHeaders): void {
    this.links = this.parseLinks.parse(headers.get('link') ?? '');
    if (data) {
      for (const d of data) {
        this.proprietaires.push(d);
      }
    }
  }
}
