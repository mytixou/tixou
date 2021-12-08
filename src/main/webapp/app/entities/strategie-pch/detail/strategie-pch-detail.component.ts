import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStrategiePch } from '../strategie-pch.model';

@Component({
  selector: 'jhi-strategie-pch-detail',
  templateUrl: './strategie-pch-detail.component.html',
})
export class StrategiePchDetailComponent implements OnInit {
  strategiePch: IStrategiePch | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ strategiePch }) => {
      this.strategiePch = strategiePch;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
