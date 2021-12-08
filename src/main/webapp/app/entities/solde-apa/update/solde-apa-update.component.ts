import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISoldeApa, SoldeApa } from '../solde-apa.model';
import { SoldeApaService } from '../service/solde-apa.service';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';

@Component({
  selector: 'jhi-solde-apa-update',
  templateUrl: './solde-apa-update.component.html',
})
export class SoldeApaUpdateComponent implements OnInit {
  isSaving = false;

  beneficiairesSharedCollection: IBeneficiaire[] = [];

  editForm = this.fb.group({
    id: [],
    annee: [],
    mois: [],
    soldeMontantApa: [],
    soldeHeureApa: [],
    beneficiaire: [],
  });

  constructor(
    protected soldeApaService: SoldeApaService,
    protected beneficiaireService: BeneficiaireService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ soldeApa }) => {
      this.updateForm(soldeApa);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const soldeApa = this.createFromForm();
    if (soldeApa.id !== undefined) {
      this.subscribeToSaveResponse(this.soldeApaService.update(soldeApa));
    } else {
      this.subscribeToSaveResponse(this.soldeApaService.create(soldeApa));
    }
  }

  trackBeneficiaireById(index: number, item: IBeneficiaire): string {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISoldeApa>>): void {
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

  protected updateForm(soldeApa: ISoldeApa): void {
    this.editForm.patchValue({
      id: soldeApa.id,
      annee: soldeApa.annee,
      mois: soldeApa.mois,
      soldeMontantApa: soldeApa.soldeMontantApa,
      soldeHeureApa: soldeApa.soldeHeureApa,
      beneficiaire: soldeApa.beneficiaire,
    });

    this.beneficiairesSharedCollection = this.beneficiaireService.addBeneficiaireToCollectionIfMissing(
      this.beneficiairesSharedCollection,
      soldeApa.beneficiaire
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

  protected createFromForm(): ISoldeApa {
    return {
      ...new SoldeApa(),
      id: this.editForm.get(['id'])!.value,
      annee: this.editForm.get(['annee'])!.value,
      mois: this.editForm.get(['mois'])!.value,
      soldeMontantApa: this.editForm.get(['soldeMontantApa'])!.value,
      soldeHeureApa: this.editForm.get(['soldeHeureApa'])!.value,
      beneficiaire: this.editForm.get(['beneficiaire'])!.value,
    };
  }
}
