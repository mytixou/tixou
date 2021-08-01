import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRefContrainte } from '../ref-contrainte.model';

@Component({
  selector: 'jhi-ref-contrainte-detail',
  templateUrl: './ref-contrainte-detail.component.html',
})
export class RefContrainteDetailComponent implements OnInit {
  refContrainte: IRefContrainte | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refContrainte }) => {
      this.refContrainte = refContrainte;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
