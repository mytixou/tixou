import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IStrategiePchE, StrategiePchE } from '../strategie-pch-e.model';
import { StrategiePchEService } from '../service/strategie-pch-e.service';
import { IAide } from 'app/entities/aide/aide.model';
import { AideService } from 'app/entities/aide/service/aide.service';

@Component({
  selector: 'jhi-strategie-pch-e-update',
  templateUrl: './strategie-pch-e-update.component.html',
})
export class StrategiePchEUpdateComponent implements OnInit {
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
    protected strategiePchEService: StrategiePchEService,
    protected aideService: AideService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ strategiePchE }) => {
      this.updateForm(strategiePchE);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const strategiePchE = this.createFromForm();
    if (strategiePchE.id !== undefined) {
      this.subscribeToSaveResponse(this.strategiePchEService.update(strategiePchE));
    } else {
      this.subscribeToSaveResponse(this.strategiePchEService.create(strategiePchE));
    }
  }

  trackAideById(index: number, item: IAide): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStrategiePchE>>): void {
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

  protected updateForm(strategiePchE: IStrategiePchE): void {
    this.editForm.patchValue({
      id: strategiePchE.id,
      isActif: strategiePchE.isActif,
      anne: strategiePchE.anne,
      montantPlafond: strategiePchE.montantPlafond,
      nbPlafondheure: strategiePchE.nbPlafondheure,
      taux: strategiePchE.taux,
      aide: strategiePchE.aide,
    });

    this.aidesSharedCollection = this.aideService.addAideToCollectionIfMissing(this.aidesSharedCollection, strategiePchE.aide);
  }

  protected loadRelationshipsOptions(): void {
    this.aideService
      .query()
      .pipe(map((res: HttpResponse<IAide[]>) => res.body ?? []))
      .pipe(map((aides: IAide[]) => this.aideService.addAideToCollectionIfMissing(aides, this.editForm.get('aide')!.value)))
      .subscribe((aides: IAide[]) => (this.aidesSharedCollection = aides));
  }

  protected createFromForm(): IStrategiePchE {
    return {
      ...new StrategiePchE(),
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
