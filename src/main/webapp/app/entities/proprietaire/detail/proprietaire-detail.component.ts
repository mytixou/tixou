import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProprietaire } from '../proprietaire.model';

@Component({
  selector: 'jhi-proprietaire-detail',
  templateUrl: './proprietaire-detail.component.html',
})
export class ProprietaireDetailComponent implements OnInit {
  proprietaire: IProprietaire | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proprietaire }) => {
      this.proprietaire = proprietaire;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
