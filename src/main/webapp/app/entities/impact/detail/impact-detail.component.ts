import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImpact } from '../impact.model';

@Component({
  selector: 'jhi-impact-detail',
  templateUrl: './impact-detail.component.html',
})
export class ImpactDetailComponent implements OnInit {
  impact: IImpact | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ impact }) => {
      this.impact = impact;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
