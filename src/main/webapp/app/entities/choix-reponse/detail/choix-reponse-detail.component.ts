import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChoixReponse } from '../choix-reponse.model';

@Component({
  selector: 'jhi-choix-reponse-detail',
  templateUrl: './choix-reponse-detail.component.html',
})
export class ChoixReponseDetailComponent implements OnInit {
  choixReponse: IChoixReponse | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ choixReponse }) => {
      this.choixReponse = choixReponse;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
