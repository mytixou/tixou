import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDepartement, Departement } from '../departement.model';
import { DepartementService } from '../service/departement.service';
import { IRegion } from 'app/entities/region/region.model';
import { RegionService } from 'app/entities/region/service/region.service';

@Component({
  selector: 'jhi-departement-update',
  templateUrl: './departement-update.component.html',
})
export class DepartementUpdateComponent implements OnInit {
  isSaving = false;

  regionsSharedCollection: IRegion[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    code: [],
    region: [],
  });

  constructor(
    protected departementService: DepartementService,
    protected regionService: RegionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ departement }) => {
      this.updateForm(departement);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const departement = this.createFromForm();
    if (departement.id !== undefined) {
      this.subscribeToSaveResponse(this.departementService.update(departement));
    } else {
      this.subscribeToSaveResponse(this.departementService.create(departement));
    }
  }

  trackRegionById(index: number, item: IRegion): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartement>>): void {
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

  protected updateForm(departement: IDepartement): void {
    this.editForm.patchValue({
      id: departement.id,
      nom: departement.nom,
      code: departement.code,
      region: departement.region,
    });

    this.regionsSharedCollection = this.regionService.addRegionToCollectionIfMissing(this.regionsSharedCollection, departement.region);
  }

  protected loadRelationshipsOptions(): void {
    this.regionService
      .query()
      .pipe(map((res: HttpResponse<IRegion[]>) => res.body ?? []))
      .pipe(map((regions: IRegion[]) => this.regionService.addRegionToCollectionIfMissing(regions, this.editForm.get('region')!.value)))
      .subscribe((regions: IRegion[]) => (this.regionsSharedCollection = regions));
  }

  protected createFromForm(): IDepartement {
    return {
      ...new Departement(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      code: this.editForm.get(['code'])!.value,
      region: this.editForm.get(['region'])!.value,
    };
  }
}
