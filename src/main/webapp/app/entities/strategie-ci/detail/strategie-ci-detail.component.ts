import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStrategieCi } from '../strategie-ci.model';

@Component({
  selector: 'jhi-strategie-ci-detail',
  templateUrl: './strategie-ci-detail.component.html',
})
export class StrategieCiDetailComponent implements OnInit {
  strategieCi: IStrategieCi | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ strategieCi }) => {
      this.strategieCi = strategieCi;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
