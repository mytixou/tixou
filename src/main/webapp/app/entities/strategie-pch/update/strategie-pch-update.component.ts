import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IStrategiePch, StrategiePch } from '../strategie-pch.model';
import { StrategiePchService } from '../service/strategie-pch.service';
import { IAide } from 'app/entities/aide/aide.model';
import { AideService } from 'app/entities/aide/service/aide.service';

@Component({
  selector: 'jhi-strategie-pch-update',
  templateUrl: './strategie-pch-update.component.html',
})
export class StrategiePchUpdateComponent implements OnInit {
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
    protected strategiePchService: StrategiePchService,
    protected aideService: AideService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ strategiePch }) => {
      this.updateForm(strategiePch);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const strategiePch = this.createFromForm();
    if (strategiePch.id !== undefined) {
      this.subscribeToSaveResponse(this.strategiePchService.update(strategiePch));
    } else {
      this.subscribeToSaveResponse(this.strategiePchService.create(strategiePch));
    }
  }

  trackAideById(index: number, item: IAide): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStrategiePch>>): void {
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

  protected updateForm(strategiePch: IStrategiePch): void {
    this.editForm.patchValue({
      id: strategiePch.id,
      isActif: strategiePch.isActif,
      anne: strategiePch.anne,
      montantPlafond: strategiePch.montantPlafond,
      nbPlafondheure: strategiePch.nbPlafondheure,
      taux: strategiePch.taux,
      aide: strategiePch.aide,
    });

    this.aidesSharedCollection = this.aideService.addAideToCollectionIfMissing(this.aidesSharedCollection, strategiePch.aide);
  }

  protected loadRelationshipsOptions(): void {
    this.aideService
      .query()
      .pipe(map((res: HttpResponse<IAide[]>) => res.body ?? []))
      .pipe(map((aides: IAide[]) => this.aideService.addAideToCollectionIfMissing(aides, this.editForm.get('aide')!.value)))
      .subscribe((aides: IAide[]) => (this.aidesSharedCollection = aides));
  }

  protected createFromForm(): IStrategiePch {
    return {
      ...new StrategiePch(),
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
