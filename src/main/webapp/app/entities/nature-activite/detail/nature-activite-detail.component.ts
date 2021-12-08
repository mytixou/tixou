import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INatureActivite } from '../nature-activite.model';

@Component({
  selector: 'jhi-nature-activite-detail',
  templateUrl: './nature-activite-detail.component.html',
})
export class NatureActiviteDetailComponent implements OnInit {
  natureActivite: INatureActivite | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ natureActivite }) => {
      this.natureActivite = natureActivite;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
