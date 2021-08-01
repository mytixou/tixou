import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocal } from '../local.model';

@Component({
  selector: 'jhi-local-detail',
  templateUrl: './local-detail.component.html',
})
export class LocalDetailComponent implements OnInit {
  local: ILocal | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ local }) => {
      this.local = local;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
