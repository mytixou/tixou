import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ILocal, Local } from '../local.model';
import { LocalService } from '../service/local.service';
import { IBatiment } from 'app/entities/batiment/batiment.model';
import { BatimentService } from 'app/entities/batiment/service/batiment.service';

@Component({
  selector: 'jhi-local-update',
  templateUrl: './local-update.component.html',
})
export class LocalUpdateComponent implements OnInit {
  isSaving = false;

  batimentsSharedCollection: IBatiment[] = [];

  editForm = this.fb.group({
    id: [],
    designation: [],
    surface: [],
    etage: [],
    typelocal: [],
    batiment: [],
  });

  constructor(
    protected localService: LocalService,
    protected batimentService: BatimentService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ local }) => {
      this.updateForm(local);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const local = this.createFromForm();
    if (local.id !== undefined) {
      this.subscribeToSaveResponse(this.localService.update(local));
    } else {
      this.subscribeToSaveResponse(this.localService.create(local));
    }
  }

  trackBatimentById(index: number, item: IBatiment): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocal>>): void {
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

  protected updateForm(local: ILocal): void {
    this.editForm.patchValue({
      id: local.id,
      designation: local.designation,
      surface: local.surface,
      etage: local.etage,
      typelocal: local.typelocal,
      batiment: local.batiment,
    });

    this.batimentsSharedCollection = this.batimentService.addBatimentToCollectionIfMissing(this.batimentsSharedCollection, local.batiment);
  }

  protected loadRelationshipsOptions(): void {
    this.batimentService
      .query()
      .pipe(map((res: HttpResponse<IBatiment[]>) => res.body ?? []))
      .pipe(
        map((batiments: IBatiment[]) =>
          this.batimentService.addBatimentToCollectionIfMissing(batiments, this.editForm.get('batiment')!.value)
        )
      )
      .subscribe((batiments: IBatiment[]) => (this.batimentsSharedCollection = batiments));
  }

  protected createFromForm(): ILocal {
    return {
      ...new Local(),
      id: this.editForm.get(['id'])!.value,
      designation: this.editForm.get(['designation'])!.value,
      surface: this.editForm.get(['surface'])!.value,
      etage: this.editForm.get(['etage'])!.value,
      typelocal: this.editForm.get(['typelocal'])!.value,
      batiment: this.editForm.get(['batiment'])!.value,
    };
  }
}
