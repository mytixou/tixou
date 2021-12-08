import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISoldeCi } from '../solde-ci.model';

@Component({
  selector: 'jhi-solde-ci-detail',
  templateUrl: './solde-ci-detail.component.html',
})
export class SoldeCiDetailComponent implements OnInit {
  soldeCi: ISoldeCi | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ soldeCi }) => {
      this.soldeCi = soldeCi;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
