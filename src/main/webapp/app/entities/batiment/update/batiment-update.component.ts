import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IBatiment, Batiment } from '../batiment.model';
import { BatimentService } from '../service/batiment.service';
import { ITerrain } from 'app/entities/terrain/terrain.model';
import { TerrainService } from 'app/entities/terrain/service/terrain.service';

@Component({
  selector: 'jhi-batiment-update',
  templateUrl: './batiment-update.component.html',
})
export class BatimentUpdateComponent implements OnInit {
  isSaving = false;

  terrainsSharedCollection: ITerrain[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    emprise: [],
    hauteur: [],
    etages: [],
    terrain: [],
  });

  constructor(
    protected batimentService: BatimentService,
    protected terrainService: TerrainService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ batiment }) => {
      this.updateForm(batiment);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const batiment = this.createFromForm();
    if (batiment.id !== undefined) {
      this.subscribeToSaveResponse(this.batimentService.update(batiment));
    } else {
      this.subscribeToSaveResponse(this.batimentService.create(batiment));
    }
  }

  trackTerrainById(index: number, item: ITerrain): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBatiment>>): void {
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

  protected updateForm(batiment: IBatiment): void {
    this.editForm.patchValue({
      id: batiment.id,
      nom: batiment.nom,
      emprise: batiment.emprise,
      hauteur: batiment.hauteur,
      etages: batiment.etages,
      terrain: batiment.terrain,
    });

    this.terrainsSharedCollection = this.terrainService.addTerrainToCollectionIfMissing(this.terrainsSharedCollection, batiment.terrain);
  }

  protected loadRelationshipsOptions(): void {
    this.terrainService
      .query()
      .pipe(map((res: HttpResponse<ITerrain[]>) => res.body ?? []))
      .pipe(
        map((terrains: ITerrain[]) => this.terrainService.addTerrainToCollectionIfMissing(terrains, this.editForm.get('terrain')!.value))
      )
      .subscribe((terrains: ITerrain[]) => (this.terrainsSharedCollection = terrains));
  }

  protected createFromForm(): IBatiment {
    return {
      ...new Batiment(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      emprise: this.editForm.get(['emprise'])!.value,
      hauteur: this.editForm.get(['hauteur'])!.value,
      etages: this.editForm.get(['etages'])!.value,
      terrain: this.editForm.get(['terrain'])!.value,
    };
  }
}
