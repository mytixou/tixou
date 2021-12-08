import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IStrategieCi, StrategieCi } from '../strategie-ci.model';
import { StrategieCiService } from '../service/strategie-ci.service';
import { IAide } from 'app/entities/aide/aide.model';
import { AideService } from 'app/entities/aide/service/aide.service';

@Component({
  selector: 'jhi-strategie-ci-update',
  templateUrl: './strategie-ci-update.component.html',
})
export class StrategieCiUpdateComponent implements OnInit {
  isSaving = false;

  aidesSharedCollection: IAide[] = [];

  editForm = this.fb.group({
    id: [],
    isActif: [],
    anne: [],
    montantPlafond: [],
    taux: [],
    aide: [],
  });

  constructor(
    protected strategieCiService: StrategieCiService,
    protected aideService: AideService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ strategieCi }) => {
      this.updateForm(strategieCi);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const strategieCi = this.createFromForm();
    if (strategieCi.id !== undefined) {
      this.subscribeToSaveResponse(this.strategieCiService.update(strategieCi));
    } else {
      this.subscribeToSaveResponse(this.strategieCiService.create(strategieCi));
    }
  }

  trackAideById(index: number, item: IAide): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStrategieCi>>): void {
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

  protected updateForm(strategieCi: IStrategieCi): void {
    this.editForm.patchValue({
      id: strategieCi.id,
      isActif: strategieCi.isActif,
      anne: strategieCi.anne,
      montantPlafond: strategieCi.montantPlafond,
      taux: strategieCi.taux,
      aide: strategieCi.aide,
    });

    this.aidesSharedCollection = this.aideService.addAideToCollectionIfMissing(this.aidesSharedCollection, strategieCi.aide);
  }

  protected loadRelationshipsOptions(): void {
    this.aideService
      .query()
      .pipe(map((res: HttpResponse<IAide[]>) => res.body ?? []))
      .pipe(map((aides: IAide[]) => this.aideService.addAideToCollectionIfMissing(aides, this.editForm.get('aide')!.value)))
      .subscribe((aides: IAide[]) => (this.aidesSharedCollection = aides));
  }

  protected createFromForm(): IStrategieCi {
    return {
      ...new StrategieCi(),
      id: this.editForm.get(['id'])!.value,
      isActif: this.editForm.get(['isActif'])!.value,
      anne: this.editForm.get(['anne'])!.value,
      montantPlafond: this.editForm.get(['montantPlafond'])!.value,
      taux: this.editForm.get(['taux'])!.value,
      aide: this.editForm.get(['aide'])!.value,
    };
  }
}
