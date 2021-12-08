import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IBeneficiaire, Beneficiaire } from '../beneficiaire.model';
import { BeneficiaireService } from '../service/beneficiaire.service';

@Component({
  selector: 'jhi-beneficiaire-update',
  templateUrl: './beneficiaire-update.component.html',
})
export class BeneficiaireUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    externeId: [],
    isActif: [],
    dateInscription: [],
    dateResiliation: [],
  });

  constructor(protected beneficiaireService: BeneficiaireService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ beneficiaire }) => {
      this.updateForm(beneficiaire);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const beneficiaire = this.createFromForm();
    if (beneficiaire.id !== undefined) {
      this.subscribeToSaveResponse(this.beneficiaireService.update(beneficiaire));
    } else {
      this.subscribeToSaveResponse(this.beneficiaireService.create(beneficiaire));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBeneficiaire>>): void {
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

  protected updateForm(beneficiaire: IBeneficiaire): void {
    this.editForm.patchValue({
      id: beneficiaire.id,
      externeId: beneficiaire.externeId,
      isActif: beneficiaire.isActif,
      dateInscription: beneficiaire.dateInscription,
      dateResiliation: beneficiaire.dateResiliation,
    });
  }

  protected createFromForm(): IBeneficiaire {
    return {
      ...new Beneficiaire(),
      id: this.editForm.get(['id'])!.value,
      externeId: this.editForm.get(['externeId'])!.value,
      isActif: this.editForm.get(['isActif'])!.value,
      dateInscription: this.editForm.get(['dateInscription'])!.value,
      dateResiliation: this.editForm.get(['dateResiliation'])!.value,
    };
  }
}
