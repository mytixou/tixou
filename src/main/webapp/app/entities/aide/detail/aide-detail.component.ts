import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAide } from '../aide.model';

@Component({
  selector: 'jhi-aide-detail',
  templateUrl: './aide-detail.component.html',
})
export class AideDetailComponent implements OnInit {
  aide: IAide | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aide }) => {
      this.aide = aide;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
