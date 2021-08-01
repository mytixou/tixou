import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProprietaire, Proprietaire } from '../proprietaire.model';
import { ProprietaireService } from '../service/proprietaire.service';
import { ILocal } from 'app/entities/local/local.model';
import { LocalService } from 'app/entities/local/service/local.service';

@Component({
  selector: 'jhi-proprietaire-update',
  templateUrl: './proprietaire-update.component.html',
})
export class ProprietaireUpdateComponent implements OnInit {
  isSaving = false;

  localsSharedCollection: ILocal[] = [];

  editForm = this.fb.group({
    id: [],
    prenom: [],
    nom: [],
    email: [],
    telephoneFixe: [],
    telephonePortable: [],
    depuis: [],
    habiteLocal: [],
    finLe: [],
    locals: [],
  });

  constructor(
    protected proprietaireService: ProprietaireService,
    protected localService: LocalService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proprietaire }) => {
      this.updateForm(proprietaire);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const proprietaire = this.createFromForm();
    if (proprietaire.id !== undefined) {
      this.subscribeToSaveResponse(this.proprietaireService.update(proprietaire));
    } else {
      this.subscribeToSaveResponse(this.proprietaireService.create(proprietaire));
    }
  }

  trackLocalById(index: number, item: ILocal): number {
    return item.id!;
  }

  getSelectedLocal(option: ILocal, selectedVals?: ILocal[]): ILocal {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProprietaire>>): void {
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

  protected updateForm(proprietaire: IProprietaire): void {
    this.editForm.patchValue({
      id: proprietaire.id,
      prenom: proprietaire.prenom,
      nom: proprietaire.nom,
      email: proprietaire.email,
      telephoneFixe: proprietaire.telephoneFixe,
      telephonePortable: proprietaire.telephonePortable,
      depuis: proprietaire.depuis,
      habiteLocal: proprietaire.habiteLocal,
      finLe: proprietaire.finLe,
      locals: proprietaire.locals,
    });

    this.localsSharedCollection = this.localService.addLocalToCollectionIfMissing(
      this.localsSharedCollection,
      ...(proprietaire.locals ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.localService
      .query()
      .pipe(map((res: HttpResponse<ILocal[]>) => res.body ?? []))
      .pipe(
        map((locals: ILocal[]) => this.localService.addLocalToCollectionIfMissing(locals, ...(this.editForm.get('locals')!.value ?? [])))
      )
      .subscribe((locals: ILocal[]) => (this.localsSharedCollection = locals));
  }

  protected createFromForm(): IProprietaire {
    return {
      ...new Proprietaire(),
      id: this.editForm.get(['id'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      email: this.editForm.get(['email'])!.value,
      telephoneFixe: this.editForm.get(['telephoneFixe'])!.value,
      telephonePortable: this.editForm.get(['telephonePortable'])!.value,
      depuis: this.editForm.get(['depuis'])!.value,
      habiteLocal: this.editForm.get(['habiteLocal'])!.value,
      finLe: this.editForm.get(['finLe'])!.value,
      locals: this.editForm.get(['locals'])!.value,
    };
  }
}
