import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISoldePch } from '../solde-pch.model';

@Component({
  selector: 'jhi-solde-pch-detail',
  templateUrl: './solde-pch-detail.component.html',
})
export class SoldePchDetailComponent implements OnInit {
  soldePch: ISoldePch | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ soldePch }) => {
      this.soldePch = soldePch;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
