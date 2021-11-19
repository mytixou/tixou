import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IChoixReponse, ChoixReponse } from '../choix-reponse.model';
import { ChoixReponseService } from '../service/choix-reponse.service';
import { IDossier } from 'app/entities/dossier/dossier.model';
import { DossierService } from 'app/entities/dossier/service/dossier.service';
import { IReponse } from 'app/entities/reponse/reponse.model';
import { ReponseService } from 'app/entities/reponse/service/reponse.service';

@Component({
  selector: 'jhi-choix-reponse-update',
  templateUrl: './choix-reponse-update.component.html',
})
export class ChoixReponseUpdateComponent implements OnInit {
  isSaving = false;

  dossiersSharedCollection: IDossier[] = [];
  reponsesSharedCollection: IReponse[] = [];

  editForm = this.fb.group({
    id: [],
    dateChoix: [],
    dossier: [],
    reponse: [],
  });

  constructor(
    protected choixReponseService: ChoixReponseService,
    protected dossierService: DossierService,
    protected reponseService: ReponseService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ choixReponse }) => {
      if (choixReponse.id === undefined) {
        const today = dayjs().startOf('day');
        choixReponse.dateChoix = today;
      }

      this.updateForm(choixReponse);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const choixReponse = this.createFromForm();
    if (choixReponse.id !== undefined) {
      this.subscribeToSaveResponse(this.choixReponseService.update(choixReponse));
    } else {
      this.subscribeToSaveResponse(this.choixReponseService.create(choixReponse));
    }
  }

  trackDossierById(index: number, item: IDossier): number {
    return item.id!;
  }

  trackReponseById(index: number, item: IReponse): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChoixReponse>>): void {
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

  protected updateForm(choixReponse: IChoixReponse): void {
    this.editForm.patchValue({
      id: choixReponse.id,
      dateChoix: choixReponse.dateChoix ? choixReponse.dateChoix.format(DATE_TIME_FORMAT) : null,
      dossier: choixReponse.dossier,
      reponse: choixReponse.reponse,
    });

    this.dossiersSharedCollection = this.dossierService.addDossierToCollectionIfMissing(
      this.dossiersSharedCollection,
      choixReponse.dossier
    );
    this.reponsesSharedCollection = this.reponseService.addReponseToCollectionIfMissing(
      this.reponsesSharedCollection,
      choixReponse.reponse
    );
  }

  protected loadRelationshipsOptions(): void {
    this.dossierService
      .query()
      .pipe(map((res: HttpResponse<IDossier[]>) => res.body ?? []))
      .pipe(
        map((dossiers: IDossier[]) => this.dossierService.addDossierToCollectionIfMissing(dossiers, this.editForm.get('dossier')!.value))
      )
      .subscribe((dossiers: IDossier[]) => (this.dossiersSharedCollection = dossiers));

    this.reponseService
      .query()
      .pipe(map((res: HttpResponse<IReponse[]>) => res.body ?? []))
      .pipe(
        map((reponses: IReponse[]) => this.reponseService.addReponseToCollectionIfMissing(reponses, this.editForm.get('reponse')!.value))
      )
      .subscribe((reponses: IReponse[]) => (this.reponsesSharedCollection = reponses));
  }

  protected createFromForm(): IChoixReponse {
    return {
      ...new ChoixReponse(),
      id: this.editForm.get(['id'])!.value,
      dateChoix: this.editForm.get(['dateChoix'])!.value ? dayjs(this.editForm.get(['dateChoix'])!.value, DATE_TIME_FORMAT) : undefined,
      dossier: this.editForm.get(['dossier'])!.value,
      reponse: this.editForm.get(['reponse'])!.value,
    };
  }
}
