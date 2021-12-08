import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IStrategieApa, StrategieApa } from '../strategie-apa.model';
import { StrategieApaService } from '../service/strategie-apa.service';
import { IAide } from 'app/entities/aide/aide.model';
import { AideService } from 'app/entities/aide/service/aide.service';

@Component({
  selector: 'jhi-strategie-apa-update',
  templateUrl: './strategie-apa-update.component.html',
})
export class StrategieApaUpdateComponent implements OnInit {
  isSaving = false;

  aidesSharedCollection: IAide[] = [];

  editForm = this.fb.group({
    id: [],
    isActif: [],
    anne: [],
    montantPlafond: [],
    nbPlafondheure: [],
    taux: [],
    aide: [],
  });

  constructor(
    protected strategieApaService: StrategieApaService,
    protected aideService: AideService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ strategieApa }) => {
      this.updateForm(strategieApa);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const strategieApa = this.createFromForm();
    if (strategieApa.id !== undefined) {
      this.subscribeToSaveResponse(this.strategieApaService.update(strategieApa));
    } else {
      this.subscribeToSaveResponse(this.strategieApaService.create(strategieApa));
    }
  }

  trackAideById(index: number, item: IAide): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStrategieApa>>): void {
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

  protected updateForm(strategieApa: IStrategieApa): void {
    this.editForm.patchValue({
      id: strategieApa.id,
      isActif: strategieApa.isActif,
      anne: strategieApa.anne,
      montantPlafond: strategieApa.montantPlafond,
      nbPlafondheure: strategieApa.nbPlafondheure,
      taux: strategieApa.taux,
      aide: strategieApa.aide,
    });

    this.aidesSharedCollection = this.aideService.addAideToCollectionIfMissing(this.aidesSharedCollection, strategieApa.aide);
  }

  protected loadRelationshipsOptions(): void {
    this.aideService
      .query()
      .pipe(map((res: HttpResponse<IAide[]>) => res.body ?? []))
      .pipe(map((aides: IAide[]) => this.aideService.addAideToCollectionIfMissing(aides, this.editForm.get('aide')!.value)))
      .subscribe((aides: IAide[]) => (this.aidesSharedCollection = aides));
  }

  protected createFromForm(): IStrategieApa {
    return {
      ...new StrategieApa(),
      id: this.editForm.get(['id'])!.value,
      isActif: this.editForm.get(['isActif'])!.value,
      anne: this.editForm.get(['anne'])!.value,
      montantPlafond: this.editForm.get(['montantPlafond'])!.value,
      nbPlafondheure: this.editForm.get(['nbPlafondheure'])!.value,
      taux: this.editForm.get(['taux'])!.value,
      aide: this.editForm.get(['aide'])!.value,
    };
  }
}
