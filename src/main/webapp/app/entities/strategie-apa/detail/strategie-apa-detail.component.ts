import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStrategieApa } from '../strategie-apa.model';

@Component({
  selector: 'jhi-strategie-apa-detail',
  templateUrl: './strategie-apa-detail.component.html',
})
export class StrategieApaDetailComponent implements OnInit {
  strategieApa: IStrategieApa | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ strategieApa }) => {
      this.strategieApa = strategieApa;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
