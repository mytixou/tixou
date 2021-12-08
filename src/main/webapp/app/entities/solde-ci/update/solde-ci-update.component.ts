import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISoldeCi, SoldeCi } from '../solde-ci.model';
import { SoldeCiService } from '../service/solde-ci.service';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';

@Component({
  selector: 'jhi-solde-ci-update',
  templateUrl: './solde-ci-update.component.html',
})
export class SoldeCiUpdateComponent implements OnInit {
  isSaving = false;

  beneficiairesSharedCollection: IBeneficiaire[] = [];

  editForm = this.fb.group({
    id: [],
    annee: [],
    soldeMontantCi: [],
    soldeMontantCiRec: [],
    beneficiaire: [],
  });

  constructor(
    protected soldeCiService: SoldeCiService,
    protected beneficiaireService: BeneficiaireService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ soldeCi }) => {
      this.updateForm(soldeCi);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const soldeCi = this.createFromForm();
    if (soldeCi.id !== undefined) {
      this.subscribeToSaveResponse(this.soldeCiService.update(soldeCi));
    } else {
      this.subscribeToSaveResponse(this.soldeCiService.create(soldeCi));
    }
  }

  trackBeneficiaireById(index: number, item: IBeneficiaire): string {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISoldeCi>>): void {
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

  protected updateForm(soldeCi: ISoldeCi): void {
    this.editForm.patchValue({
      id: soldeCi.id,
      annee: soldeCi.annee,
      soldeMontantCi: soldeCi.soldeMontantCi,
      soldeMontantCiRec: soldeCi.soldeMontantCiRec,
      beneficiaire: soldeCi.beneficiaire,
    });

    this.beneficiairesSharedCollection = this.beneficiaireService.addBeneficiaireToCollectionIfMissing(
      this.beneficiairesSharedCollection,
      soldeCi.beneficiaire
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

  protected createFromForm(): ISoldeCi {
    return {
      ...new SoldeCi(),
      id: this.editForm.get(['id'])!.value,
      annee: this.editForm.get(['annee'])!.value,
      soldeMontantCi: this.editForm.get(['soldeMontantCi'])!.value,
      soldeMontantCiRec: this.editForm.get(['soldeMontantCiRec'])!.value,
      beneficiaire: this.editForm.get(['beneficiaire'])!.value,
    };
  }
}
