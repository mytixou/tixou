import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IImpact, Impact } from '../impact.model';
import { ImpactService } from '../service/impact.service';
import { IReponse } from 'app/entities/reponse/reponse.model';
import { ReponseService } from 'app/entities/reponse/service/reponse.service';

@Component({
  selector: 'jhi-impact-update',
  templateUrl: './impact-update.component.html',
})
export class ImpactUpdateComponent implements OnInit {
  isSaving = false;

  reponsesSharedCollection: IReponse[] = [];

  editForm = this.fb.group({
    id: [],
    designation: [],
    explication: [],
    typeImpact: [],
    reponse: [],
  });

  constructor(
    protected impactService: ImpactService,
    protected reponseService: ReponseService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ impact }) => {
      this.updateForm(impact);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const impact = this.createFromForm();
    if (impact.id !== undefined) {
      this.subscribeToSaveResponse(this.impactService.update(impact));
    } else {
      this.subscribeToSaveResponse(this.impactService.create(impact));
    }
  }

  trackReponseById(index: number, item: IReponse): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImpact>>): void {
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

  protected updateForm(impact: IImpact): void {
    this.editForm.patchValue({
      id: impact.id,
      designation: impact.designation,
      explication: impact.explication,
      typeImpact: impact.typeImpact,
      reponse: impact.reponse,
    });

    this.reponsesSharedCollection = this.reponseService.addReponseToCollectionIfMissing(this.reponsesSharedCollection, impact.reponse);
  }

  protected loadRelationshipsOptions(): void {
    this.reponseService
      .query()
      .pipe(map((res: HttpResponse<IReponse[]>) => res.body ?? []))
      .pipe(
        map((reponses: IReponse[]) => this.reponseService.addReponseToCollectionIfMissing(reponses, this.editForm.get('reponse')!.value))
      )
      .subscribe((reponses: IReponse[]) => (this.reponsesSharedCollection = reponses));
  }

  protected createFromForm(): IImpact {
    return {
      ...new Impact(),
      id: this.editForm.get(['id'])!.value,
      designation: this.editForm.get(['designation'])!.value,
      explication: this.editForm.get(['explication'])!.value,
      typeImpact: this.editForm.get(['typeImpact'])!.value,
      reponse: this.editForm.get(['reponse'])!.value,
    };
  }
}
