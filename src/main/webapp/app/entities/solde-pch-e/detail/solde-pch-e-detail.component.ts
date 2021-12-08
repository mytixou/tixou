import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISoldePchE } from '../solde-pch-e.model';

@Component({
  selector: 'jhi-solde-pch-e-detail',
  templateUrl: './solde-pch-e-detail.component.html',
})
export class SoldePchEDetailComponent implements OnInit {
  soldePchE: ISoldePchE | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ soldePchE }) => {
      this.soldePchE = soldePchE;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
