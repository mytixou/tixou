import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { INatureActivite, NatureActivite } from '../nature-activite.model';
import { NatureActiviteService } from '../service/nature-activite.service';
import { IStrategieCi } from 'app/entities/strategie-ci/strategie-ci.model';
import { StrategieCiService } from 'app/entities/strategie-ci/service/strategie-ci.service';
import { IStrategieApa } from 'app/entities/strategie-apa/strategie-apa.model';
import { StrategieApaService } from 'app/entities/strategie-apa/service/strategie-apa.service';
import { IStrategiePch } from 'app/entities/strategie-pch/strategie-pch.model';
import { StrategiePchService } from 'app/entities/strategie-pch/service/strategie-pch.service';
import { IStrategiePchE } from 'app/entities/strategie-pch-e/strategie-pch-e.model';
import { StrategiePchEService } from 'app/entities/strategie-pch-e/service/strategie-pch-e.service';

@Component({
  selector: 'jhi-nature-activite-update',
  templateUrl: './nature-activite-update.component.html',
})
export class NatureActiviteUpdateComponent implements OnInit {
  isSaving = false;

  strategieCisSharedCollection: IStrategieCi[] = [];
  strategieApasSharedCollection: IStrategieApa[] = [];
  strategiePchesSharedCollection: IStrategiePch[] = [];
  strategiePchESSharedCollection: IStrategiePchE[] = [];

  editForm = this.fb.group({
    id: [],
    code: [],
    libelle: [],
    description: [],
    strategie: [],
    strategie: [],
    strategie: [],
    strategie: [],
  });

  constructor(
    protected natureActiviteService: NatureActiviteService,
    protected strategieCiService: StrategieCiService,
    protected strategieApaService: StrategieApaService,
    protected strategiePchService: StrategiePchService,
    protected strategiePchEService: StrategiePchEService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ natureActivite }) => {
      this.updateForm(natureActivite);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const natureActivite = this.createFromForm();
    if (natureActivite.id !== undefined) {
      this.subscribeToSaveResponse(this.natureActiviteService.update(natureActivite));
    } else {
      this.subscribeToSaveResponse(this.natureActiviteService.create(natureActivite));
    }
  }

  trackStrategieCiById(index: number, item: IStrategieCi): number {
    return item.id!;
  }

  trackStrategieApaById(index: number, item: IStrategieApa): number {
    return item.id!;
  }

  trackStrategiePchById(index: number, item: IStrategiePch): number {
    return item.id!;
  }

  trackStrategiePchEById(index: number, item: IStrategiePchE): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INatureActivite>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(natureActivite: INatureActivite): void {
    this.editForm.patchValue({
      id: natureActivite.id,
      code: natureActivite.code,
      libelle: natureActivite.libelle,
      description: natureActivite.description,
      strategie: natureActivite.strategie,
      strategie: natureActivite.strategie,
      strategie: natureActivite.strategie,
      strategie: natureActivite.strategie,
    });

    this.strategieCisSharedCollection = this.strategieCiService.addStrategieCiToCollectionIfMissing(
      this.strategieCisSharedCollection,
      natureActivite.strategie
    );
    this.strategieApasSharedCollection = this.strategieApaService.addStrategieApaToCollectionIfMissing(
      this.strategieApasSharedCollection,
      natureActivite.strategie
    );
    this.strategiePchesSharedCollection = this.strategiePchService.addStrategiePchToCollectionIfMissing(
      this.strategiePchesSharedCollection,
      natureActivite.strategie
    );
    this.strategiePchESSharedCollection = this.strategiePchEService.addStrategiePchEToCollectionIfMissing(
      this.strategiePchESSharedCollection,
      natureActivite.strategie
    );
  }

  protected loadRelationshipsOptions(): void {
    this.strategieCiService
      .query()
      .pipe(map((res: HttpResponse<IStrategieCi[]>) => res.body ?? []))
      .pipe(
        map((strategieCis: IStrategieCi[]) =>
          this.strategieCiService.addStrategieCiToCollectionIfMissing(strategieCis, this.editForm.get('strategie')!.value)
        )
      )
      .subscribe((strategieCis: IStrategieCi[]) => (this.strategieCisSharedCollection = strategieCis));

    this.strategieApaService
      .query()
      .pipe(map((res: HttpResponse<IStrategieApa[]>) => res.body ?? []))
      .pipe(
        map((strategieApas: IStrategieApa[]) =>
          this.strategieApaService.addStrategieApaToCollectionIfMissing(strategieApas, this.editForm.get('strategie')!.value)
        )
      )
      .subscribe((strategieApas: IStrategieApa[]) => (this.strategieApasSharedCollection = strategieApas));

    this.strategiePchService
      .query()
      .pipe(map((res: HttpResponse<IStrategiePch[]>) => res.body ?? []))
      .pipe(
        map((strategiePches: IStrategiePch[]) =>
          this.strategiePchService.addStrategiePchToCollectionIfMissing(strategiePches, this.editForm.get('strategie')!.value)
        )
      )
      .subscribe((strategiePches: IStrategiePch[]) => (this.strategiePchesSharedCollection = strategiePches));

    this.strategiePchEService
      .query()
      .pipe(map((res: HttpResponse<IStrategiePchE[]>) => res.body ?? []))
      .pipe(
        map((strategiePchES: IStrategiePchE[]) =>
          this.strategiePchEService.addStrategiePchEToCollectionIfMissing(strategiePchES, this.editForm.get('strategie')!.value)
        )
      )
      .subscribe((strategiePchES: IStrategiePchE[]) => (this.strategiePchESSharedCollection = strategiePchES));
  }

  protected createFromForm(): INatureActivite {
    return {
      ...new NatureActivite(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      description: this.editForm.get(['description'])!.value,
      strategie: this.editForm.get(['strategie'])!.value,
      strategie: this.editForm.get(['strategie'])!.value,
      strategie: this.editForm.get(['strategie'])!.value,
      strategie: this.editForm.get(['strategie'])!.value,
    };
  }
}
