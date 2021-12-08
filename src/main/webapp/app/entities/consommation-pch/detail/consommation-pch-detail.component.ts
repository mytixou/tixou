import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsommationPch } from '../consommation-pch.model';

@Component({
  selector: 'jhi-consommation-pch-detail',
  templateUrl: './consommation-pch-detail.component.html',
})
export class ConsommationPchDetailComponent implements OnInit {
  consommationPch: IConsommationPch | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consommationPch }) => {
      this.consommationPch = consommationPch;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
