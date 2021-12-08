import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISoldeApa } from '../solde-apa.model';

@Component({
  selector: 'jhi-solde-apa-detail',
  templateUrl: './solde-apa-detail.component.html',
})
export class SoldeApaDetailComponent implements OnInit {
  soldeApa: ISoldeApa | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ soldeApa }) => {
      this.soldeApa = soldeApa;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
