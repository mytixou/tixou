import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITerrain, Terrain } from '../terrain.model';
import { TerrainService } from '../service/terrain.service';
import { IAdresse } from 'app/entities/adresse/adresse.model';
import { AdresseService } from 'app/entities/adresse/service/adresse.service';

@Component({
  selector: 'jhi-terrain-update',
  templateUrl: './terrain-update.component.html',
})
export class TerrainUpdateComponent implements OnInit {
  isSaving = false;

  adressesCollection: IAdresse[] = [];

  editForm = this.fb.group({
    id: [],
    parcelle: [null, [Validators.required]],
    surface: [],
    adresse: [],
  });

  constructor(
    protected terrainService: TerrainService,
    protected adresseService: AdresseService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ terrain }) => {
      this.updateForm(terrain);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const terrain = this.createFromForm();
    if (terrain.id !== undefined) {
      this.subscribeToSaveResponse(this.terrainService.update(terrain));
    } else {
      this.subscribeToSaveResponse(this.terrainService.create(terrain));
    }
  }

  trackAdresseById(index: number, item: IAdresse): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITerrain>>): void {
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

  protected updateForm(terrain: ITerrain): void {
    this.editForm.patchValue({
      id: terrain.id,
      parcelle: terrain.parcelle,
      surface: terrain.surface,
      adresse: terrain.adresse,
    });

    this.adressesCollection = this.adresseService.addAdresseToCollectionIfMissing(this.adressesCollection, terrain.adresse);
  }

  protected loadRelationshipsOptions(): void {
    this.adresseService
      .query({ filter: 'terrain-is-null' })
      .pipe(map((res: HttpResponse<IAdresse[]>) => res.body ?? []))
      .pipe(
        map((adresses: IAdresse[]) => this.adresseService.addAdresseToCollectionIfMissing(adresses, this.editForm.get('adresse')!.value))
      )
      .subscribe((adresses: IAdresse[]) => (this.adressesCollection = adresses));
  }

  protected createFromForm(): ITerrain {
    return {
      ...new Terrain(),
      id: this.editForm.get(['id'])!.value,
      parcelle: this.editForm.get(['parcelle'])!.value,
      surface: this.editForm.get(['surface'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
    };
  }
}
