import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IConsommationPch, ConsommationPch } from '../consommation-pch.model';
import { ConsommationPchService } from '../service/consommation-pch.service';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';
import { IStrategiePch } from 'app/entities/strategie-pch/strategie-pch.model';
import { StrategiePchService } from 'app/entities/strategie-pch/service/strategie-pch.service';

@Component({
  selector: 'jhi-consommation-pch-update',
  templateUrl: './consommation-pch-update.component.html',
})
export class ConsommationPchUpdateComponent implements OnInit {
  isSaving = false;

  beneficiairesSharedCollection: IBeneficiaire[] = [];
  strategiePchesSharedCollection: IStrategiePch[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    montantCotisations: [],
    nbHeures: [],
    beneficiaire: [],
    strategiePch: [],
  });

  constructor(
    protected consommationPchService: ConsommationPchService,
    protected beneficiaireService: BeneficiaireService,
    protected strategiePchService: StrategiePchService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consommationPch }) => {
      if (consommationPch.id === undefined) {
        const today = dayjs().startOf('day');
        consommationPch.date = today;
      }

      this.updateForm(consommationPch);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const consommationPch = this.createFromForm();
    if (consommationPch.id !== undefined) {
      this.subscribeToSaveResponse(this.consommationPchService.update(consommationPch));
    } else {
      this.subscribeToSaveResponse(this.consommationPchService.create(consommationPch));
    }
  }

  trackBeneficiaireById(index: number, item: IBeneficiaire): string {
    return item.id!;
  }

  trackStrategiePchById(index: number, item: IStrategiePch): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsommationPch>>): void {
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

  protected updateForm(consommationPch: IConsommationPch): void {
    this.editForm.patchValue({
      id: consommationPch.id,
      date: consommationPch.date ? consommationPch.date.format(DATE_TIME_FORMAT) : null,
      montantCotisations: consommationPch.montantCotisations,
      nbHeures: consommationPch.nbHeures,
      beneficiaire: consommationPch.beneficiaire,
      strategiePch: consommationPch.strategiePch,
    });

    this.beneficiairesSharedCollection = this.beneficiaireService.addBeneficiaireToCollectionIfMissing(
      this.beneficiairesSharedCollection,
      consommationPch.beneficiaire
    );
    this.strategiePchesSharedCollection = this.strategiePchService.addStrategiePchToCollectionIfMissing(
      this.strategiePchesSharedCollection,
      consommationPch.strategiePch
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

    this.strategiePchService
      .query()
      .pipe(map((res: HttpResponse<IStrategiePch[]>) => res.body ?? []))
      .pipe(
        map((strategiePches: IStrategiePch[]) =>
          this.strategiePchService.addStrategiePchToCollectionIfMissing(strategiePches, this.editForm.get('strategiePch')!.value)
        )
      )
      .subscribe((strategiePches: IStrategiePch[]) => (this.strategiePchesSharedCollection = strategiePches));
  }

  protected createFromForm(): IConsommationPch {
    return {
      ...new ConsommationPch(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? dayjs(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      montantCotisations: this.editForm.get(['montantCotisations'])!.value,
      nbHeures: this.editForm.get(['nbHeures'])!.value,
      beneficiaire: this.editForm.get(['beneficiaire'])!.value,
      strategiePch: this.editForm.get(['strategiePch'])!.value,
    };
  }
}
