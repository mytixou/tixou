import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IAdresse, Adresse } from '../adresse.model';
import { AdresseService } from '../service/adresse.service';
import { IDepartement } from 'app/entities/departement/departement.model';
import { DepartementService } from 'app/entities/departement/service/departement.service';

@Component({
  selector: 'jhi-adresse-update',
  templateUrl: './adresse-update.component.html',
})
export class AdresseUpdateComponent implements OnInit {
  isSaving = false;

  departementsCollection: IDepartement[] = [];

  editForm = this.fb.group({
    id: [],
    adresseLigne1: [],
    adresseLigne2: [],
    codePostal: [],
    ville: [],
    stateProvince: [],
    departement: [],
  });

  constructor(
    protected adresseService: AdresseService,
    protected departementService: DepartementService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adresse }) => {
      this.updateForm(adresse);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adresse = this.createFromForm();
    if (adresse.id !== undefined) {
      this.subscribeToSaveResponse(this.adresseService.update(adresse));
    } else {
      this.subscribeToSaveResponse(this.adresseService.create(adresse));
    }
  }

  trackDepartementById(index: number, item: IDepartement): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdresse>>): void {
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

  protected updateForm(adresse: IAdresse): void {
    this.editForm.patchValue({
      id: adresse.id,
      adresseLigne1: adresse.adresseLigne1,
      adresseLigne2: adresse.adresseLigne2,
      codePostal: adresse.codePostal,
      ville: adresse.ville,
      stateProvince: adresse.stateProvince,
      departement: adresse.departement,
    });

    this.departementsCollection = this.departementService.addDepartementToCollectionIfMissing(
      this.departementsCollection,
      adresse.departement
    );
  }

  protected loadRelationshipsOptions(): void {
    this.departementService
      .query({ filter: 'adresse-is-null' })
      .pipe(map((res: HttpResponse<IDepartement[]>) => res.body ?? []))
      .pipe(
        map((departements: IDepartement[]) =>
          this.departementService.addDepartementToCollectionIfMissing(departements, this.editForm.get('departement')!.value)
        )
      )
      .subscribe((departements: IDepartement[]) => (this.departementsCollection = departements));
  }

  protected createFromForm(): IAdresse {
    return {
      ...new Adresse(),
      id: this.editForm.get(['id'])!.value,
      adresseLigne1: this.editForm.get(['adresseLigne1'])!.value,
      adresseLigne2: this.editForm.get(['adresseLigne2'])!.value,
      codePostal: this.editForm.get(['codePostal'])!.value,
      ville: this.editForm.get(['ville'])!.value,
      stateProvince: this.editForm.get(['stateProvince'])!.value,
      departement: this.editForm.get(['departement'])!.value,
    };
  }
}
