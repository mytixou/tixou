import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsommationPchE } from '../consommation-pch-e.model';

@Component({
  selector: 'jhi-consommation-pch-e-detail',
  templateUrl: './consommation-pch-e-detail.component.html',
})
export class ConsommationPchEDetailComponent implements OnInit {
  consommationPchE: IConsommationPchE | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consommationPchE }) => {
      this.consommationPchE = consommationPchE;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
