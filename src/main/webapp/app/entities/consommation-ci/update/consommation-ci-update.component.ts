import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IConsommationCi, ConsommationCi } from '../consommation-ci.model';
import { ConsommationCiService } from '../service/consommation-ci.service';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';
import { IStrategieCi } from 'app/entities/strategie-ci/strategie-ci.model';
import { StrategieCiService } from 'app/entities/strategie-ci/service/strategie-ci.service';

@Component({
  selector: 'jhi-consommation-ci-update',
  templateUrl: './consommation-ci-update.component.html',
})
export class ConsommationCiUpdateComponent implements OnInit {
  isSaving = false;

  beneficiairesSharedCollection: IBeneficiaire[] = [];
  strategieCisSharedCollection: IStrategieCi[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    montantCi: [],
    montantRecuperable: [],
    beneficiaire: [],
    strategieCi: [],
  });

  constructor(
    protected consommationCiService: ConsommationCiService,
    protected beneficiaireService: BeneficiaireService,
    protected strategieCiService: StrategieCiService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consommationCi }) => {
      if (consommationCi.id === undefined) {
        const today = dayjs().startOf('day');
        consommationCi.date = today;
      }

      this.updateForm(consommationCi);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const consommationCi = this.createFromForm();
    if (consommationCi.id !== undefined) {
      this.subscribeToSaveResponse(this.consommationCiService.update(consommationCi));
    } else {
      this.subscribeToSaveResponse(this.consommationCiService.create(consommationCi));
    }
  }

  trackBeneficiaireById(index: number, item: IBeneficiaire): string {
    return item.id!;
  }

  trackStrategieCiById(index: number, item: IStrategieCi): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsommationCi>>): void {
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

  protected updateForm(consommationCi: IConsommationCi): void {
    this.editForm.patchValue({
      id: consommationCi.id,
      date: consommationCi.date ? consommationCi.date.format(DATE_TIME_FORMAT) : null,
      montantCi: consommationCi.montantCi,
      montantRecuperable: consommationCi.montantRecuperable,
      beneficiaire: consommationCi.beneficiaire,
      strategieCi: consommationCi.strategieCi,
    });

    this.beneficiairesSharedCollection = this.beneficiaireService.addBeneficiaireToCollectionIfMissing(
      this.beneficiairesSharedCollection,
      consommationCi.beneficiaire
    );
    this.strategieCisSharedCollection = this.strategieCiService.addStrategieCiToCollectionIfMissing(
      this.strategieCisSharedCollection,
      consommationCi.strategieCi
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

    this.strategieCiService
      .query()
      .pipe(map((res: HttpResponse<IStrategieCi[]>) => res.body ?? []))
      .pipe(
        map((strategieCis: IStrategieCi[]) =>
          this.strategieCiService.addStrategieCiToCollectionIfMissing(strategieCis, this.editForm.get('strategieCi')!.value)
        )
      )
      .subscribe((strategieCis: IStrategieCi[]) => (this.strategieCisSharedCollection = strategieCis));
  }

  protected createFromForm(): IConsommationCi {
    return {
      ...new ConsommationCi(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? dayjs(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      montantCi: this.editForm.get(['montantCi'])!.value,
      montantRecuperable: this.editForm.get(['montantRecuperable'])!.value,
      beneficiaire: this.editForm.get(['beneficiaire'])!.value,
      strategieCi: this.editForm.get(['strategieCi'])!.value,
    };
  }
}
