import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISoldePchE, SoldePchE } from '../solde-pch-e.model';
import { SoldePchEService } from '../service/solde-pch-e.service';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';

@Component({
  selector: 'jhi-solde-pch-e-update',
  templateUrl: './solde-pch-e-update.component.html',
})
export class SoldePchEUpdateComponent implements OnInit {
  isSaving = false;

  beneficiairesSharedCollection: IBeneficiaire[] = [];

  editForm = this.fb.group({
    id: [],
    annee: [],
    mois: [],
    soldeMontantPchE: [],
    soldeHeurePchE: [],
    beneficiaire: [],
  });

  constructor(
    protected soldePchEService: SoldePchEService,
    protected beneficiaireService: BeneficiaireService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ soldePchE }) => {
      this.updateForm(soldePchE);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const soldePchE = this.createFromForm();
    if (soldePchE.id !== undefined) {
      this.subscribeToSaveResponse(this.soldePchEService.update(soldePchE));
    } else {
      this.subscribeToSaveResponse(this.soldePchEService.create(soldePchE));
    }
  }

  trackBeneficiaireById(index: number, item: IBeneficiaire): string {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISoldePchE>>): void {
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

  protected updateForm(soldePchE: ISoldePchE): void {
    this.editForm.patchValue({
      id: soldePchE.id,
      annee: soldePchE.annee,
      mois: soldePchE.mois,
      soldeMontantPchE: soldePchE.soldeMontantPchE,
      soldeHeurePchE: soldePchE.soldeHeurePchE,
      beneficiaire: soldePchE.beneficiaire,
    });

    this.beneficiairesSharedCollection = this.beneficiaireService.addBeneficiaireToCollectionIfMissing(
      this.beneficiairesSharedCollection,
      soldePchE.beneficiaire
    );
  }

  protected loadRelationshipsOptions(): void {
    this.beneficiaireService
      .query()
      .pipe(map((res: HttpResponse<IBeneficiaire[]>) => res.body ?? []))
      .pipe(
        map((beneficiaires: IBeneficiaire[]) =>
          this.beneficiaireService.addBeneficiaireToCollectionIfMissing(beneficiaires, this.editForm.get('beneficiaire')!.value)
        )
      )
      .subscribe((beneficiaires: IBeneficiaire[]) => (this.beneficiairesSharedCollection = beneficiaires));
  }

  protected createFromForm(): ISoldePchE {
    return {
      ...new SoldePchE(),
      id: this.editForm.get(['id'])!.value,
      annee: this.editForm.get(['annee'])!.value,
      mois: this.editForm.get(['mois'])!.value,
      soldeMontantPchE: this.editForm.get(['soldeMontantPchE'])!.value,
      soldeHeurePchE: this.editForm.get(['soldeHeurePchE'])!.value,
      beneficiaire: this.editForm.get(['beneficiaire'])!.value,
    };
  }
}
