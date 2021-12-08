import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsommationCi } from '../consommation-ci.model';

@Component({
  selector: 'jhi-consommation-ci-detail',
  templateUrl: './consommation-ci-detail.component.html',
})
export class ConsommationCiDetailComponent implements OnInit {
  consommationCi: IConsommationCi | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consommationCi }) => {
      this.consommationCi = consommationCi;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
