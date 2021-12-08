import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INatureMontant } from '../nature-montant.model';

@Component({
  selector: 'jhi-nature-montant-detail',
  templateUrl: './nature-montant-detail.component.html',
})
export class NatureMontantDetailComponent implements OnInit {
  natureMontant: INatureMontant | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ natureMontant }) => {
      this.natureMontant = natureMontant;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
