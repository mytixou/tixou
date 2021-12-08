import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITiersFinanceur, TiersFinanceur } from '../tiers-financeur.model';
import { TiersFinanceurService } from '../service/tiers-financeur.service';
import { IStrategieCi } from 'app/entities/strategie-ci/strategie-ci.model';
import { StrategieCiService } from 'app/entities/strategie-ci/service/strategie-ci.service';
import { IStrategieApa } from 'app/entities/strategie-apa/strategie-apa.model';
import { StrategieApaService } from 'app/entities/strategie-apa/service/strategie-apa.service';
import { IStrategiePch } from 'app/entities/strategie-pch/strategie-pch.model';
import { StrategiePchService } from 'app/entities/strategie-pch/service/strategie-pch.service';
import { IStrategiePchE } from 'app/entities/strategie-pch-e/strategie-pch-e.model';
import { StrategiePchEService } from 'app/entities/strategie-pch-e/service/strategie-pch-e.service';

@Component({
  selector: 'jhi-tiers-financeur-update',
  templateUrl: './tiers-financeur-update.component.html',
})
export class TiersFinanceurUpdateComponent implements OnInit {
  isSaving = false;

  strategieCisSharedCollection: IStrategieCi[] = [];
  strategieApasSharedCollection: IStrategieApa[] = [];
  strategiePchesSharedCollection: IStrategiePch[] = [];
  strategiePchESSharedCollection: IStrategiePchE[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    localisation: [],
    isActif: [],
    dateInscription: [],
    anneLancement: [],
    moisLancement: [],
    dateResiliation: [],
    derniereAnnee: [],
    dernierMois: [],
    strategie: [],
    strategie: [],
    strategie: [],
    strategie: [],
  });

  constructor(
    protected tiersFinanceurService: TiersFinanceurService,
    protected strategieCiService: StrategieCiService,
    protected strategieApaService: StrategieApaService,
    protected strategiePchService: StrategiePchService,
    protected strategiePchEService: StrategiePchEService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tiersFinanceur }) => {
      this.updateForm(tiersFinanceur);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tiersFinanceur = this.createFromForm();
    if (tiersFinanceur.id !== undefined) {
      this.subscribeToSaveResponse(this.tiersFinanceurService.update(tiersFinanceur));
    } else {
      this.subscribeToSaveResponse(this.tiersFinanceurService.create(tiersFinanceur));
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITiersFinanceur>>): void {
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

  protected updateForm(tiersFinanceur: ITiersFinanceur): void {
    this.editForm.patchValue({
      id: tiersFinanceur.id,
      nom: tiersFinanceur.nom,
      localisation: tiersFinanceur.localisation,
      isActif: tiersFinanceur.isActif,
      dateInscription: tiersFinanceur.dateInscription,
      anneLancement: tiersFinanceur.anneLancement,
      moisLancement: tiersFinanceur.moisLancement,
      dateResiliation: tiersFinanceur.dateResiliation,
      derniereAnnee: tiersFinanceur.derniereAnnee,
      dernierMois: tiersFinanceur.dernierMois,
      strategie: tiersFinanceur.strategie,
      strategie: tiersFinanceur.strategie,
      strategie: tiersFinanceur.strategie,
      strategie: tiersFinanceur.strategie,
    });

    this.strategieCisSharedCollection = this.strategieCiService.addStrategieCiToCollectionIfMissing(
      this.strategieCisSharedCollection,
      tiersFinanceur.strategie
    );
    this.strategieApasSharedCollection = this.strategieApaService.addStrategieApaToCollectionIfMissing(
      this.strategieApasSharedCollection,
      tiersFinanceur.strategie
    );
    this.strategiePchesSharedCollection = this.strategiePchService.addStrategiePchToCollectionIfMissing(
      this.strategiePchesSharedCollection,
      tiersFinanceur.strategie
    );
    this.strategiePchESSharedCollection = this.strategiePchEService.addStrategiePchEToCollectionIfMissing(
      this.strategiePchESSharedCollection,
      tiersFinanceur.strategie
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

  protected createFromForm(): ITiersFinanceur {
    return {
      ...new TiersFinanceur(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      localisation: this.editForm.get(['localisation'])!.value,
      isActif: this.editForm.get(['isActif'])!.value,
      dateInscription: this.editForm.get(['dateInscription'])!.value,
      anneLancement: this.editForm.get(['anneLancement'])!.value,
      moisLancement: this.editForm.get(['moisLancement'])!.value,
      dateResiliation: this.editForm.get(['dateResiliation'])!.value,
      derniereAnnee: this.editForm.get(['derniereAnnee'])!.value,
      dernierMois: this.editForm.get(['dernierMois'])!.value,
      strategie: this.editForm.get(['strategie'])!.value,
      strategie: this.editForm.get(['strategie'])!.value,
      strategie: this.editForm.get(['strategie'])!.value,
      strategie: this.editForm.get(['strategie'])!.value,
    };
  }
}
