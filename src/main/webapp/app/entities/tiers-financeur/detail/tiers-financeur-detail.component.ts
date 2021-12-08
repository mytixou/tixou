import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITiersFinanceur } from '../tiers-financeur.model';

@Component({
  selector: 'jhi-tiers-financeur-detail',
  templateUrl: './tiers-financeur-detail.component.html',
})
export class TiersFinanceurDetailComponent implements OnInit {
  tiersFinanceur: ITiersFinanceur | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tiersFinanceur }) => {
      this.tiersFinanceur = tiersFinanceur;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
