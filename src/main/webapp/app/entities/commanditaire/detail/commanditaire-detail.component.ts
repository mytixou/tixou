import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommanditaire } from '../commanditaire.model';

@Component({
  selector: 'jhi-commanditaire-detail',
  templateUrl: './commanditaire-detail.component.html',
})
export class CommanditaireDetailComponent implements OnInit {
  commanditaire: ICommanditaire | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ commanditaire }) => {
      this.commanditaire = commanditaire;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
