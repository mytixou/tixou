import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISoldePch, SoldePch } from '../solde-pch.model';
import { SoldePchService } from '../service/solde-pch.service';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';

@Component({
  selector: 'jhi-solde-pch-update',
  templateUrl: './solde-pch-update.component.html',
})
export class SoldePchUpdateComponent implements OnInit {
  isSaving = false;

  beneficiairesSharedCollection: IBeneficiaire[] = [];

  editForm = this.fb.group({
    id: [],
    annee: [],
    mois: [],
    soldeMontantPch: [],
    soldeHeurePch: [],
    beneficiaire: [],
  });

  constructor(
    protected soldePchService: SoldePchService,
    protected beneficiaireService: BeneficiaireService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ soldePch }) => {
      this.updateForm(soldePch);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const soldePch = this.createFromForm();
    if (soldePch.id !== undefined) {
      this.subscribeToSaveResponse(this.soldePchService.update(soldePch));
    } else {
      this.subscribeToSaveResponse(this.soldePchService.create(soldePch));
    }
  }

  trackBeneficiaireById(index: number, item: IBeneficiaire): string {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISoldePch>>): void {
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

  protected updateForm(soldePch: ISoldePch): void {
    this.editForm.patchValue({
      id: soldePch.id,
      annee: soldePch.annee,
      mois: soldePch.mois,
      soldeMontantPch: soldePch.soldeMontantPch,
      soldeHeurePch: soldePch.soldeHeurePch,
      beneficiaire: soldePch.beneficiaire,
    });

    this.beneficiairesSharedCollection = this.beneficiaireService.addBeneficiaireToCollectionIfMissing(
      this.beneficiairesSharedCollection,
      soldePch.beneficiaire
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

  protected createFromForm(): ISoldePch {
    return {
      ...new SoldePch(),
      id: this.editForm.get(['id'])!.value,
      annee: this.editForm.get(['annee'])!.value,
      mois: this.editForm.get(['mois'])!.value,
      soldeMontantPch: this.editForm.get(['soldeMontantPch'])!.value,
      soldeHeurePch: this.editForm.get(['soldeHeurePch'])!.value,
      beneficiaire: this.editForm.get(['beneficiaire'])!.value,
    };
  }
}
