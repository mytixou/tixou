import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsommationApa } from '../consommation-apa.model';

@Component({
  selector: 'jhi-consommation-apa-detail',
  templateUrl: './consommation-apa-detail.component.html',
})
export class ConsommationApaDetailComponent implements OnInit {
  consommationApa: IConsommationApa | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consommationApa }) => {
      this.consommationApa = consommationApa;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
