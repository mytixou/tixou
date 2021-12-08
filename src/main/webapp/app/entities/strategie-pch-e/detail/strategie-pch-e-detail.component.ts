import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStrategiePchE } from '../strategie-pch-e.model';

@Component({
  selector: 'jhi-strategie-pch-e-detail',
  templateUrl: './strategie-pch-e-detail.component.html',
})
export class StrategiePchEDetailComponent implements OnInit {
  strategiePchE: IStrategiePchE | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ strategiePchE }) => {
      this.strategiePchE = strategiePchE;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
