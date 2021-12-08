import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IConsommationPchE, ConsommationPchE } from '../consommation-pch-e.model';
import { ConsommationPchEService } from '../service/consommation-pch-e.service';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';
import { IStrategiePchE } from 'app/entities/strategie-pch-e/strategie-pch-e.model';
import { StrategiePchEService } from 'app/entities/strategie-pch-e/service/strategie-pch-e.service';

@Component({
  selector: 'jhi-consommation-pch-e-update',
  templateUrl: './consommation-pch-e-update.component.html',
})
export class ConsommationPchEUpdateComponent implements OnInit {
  isSaving = false;

  beneficiairesSharedCollection: IBeneficiaire[] = [];
  strategiePchESSharedCollection: IStrategiePchE[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    montantCotisations: [],
    nbHeures: [],
    beneficiaire: [],
    strategiePchE: [],
  });

  constructor(
    protected consommationPchEService: ConsommationPchEService,
    protected beneficiaireService: BeneficiaireService,
    protected strategiePchEService: StrategiePchEService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consommationPchE }) => {
      if (consommationPchE.id === undefined) {
        const today = dayjs().startOf('day');
        consommationPchE.date = today;
      }

      this.updateForm(consommationPchE);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const consommationPchE = this.createFromForm();
    if (consommationPchE.id !== undefined) {
      this.subscribeToSaveResponse(this.consommationPchEService.update(consommationPchE));
    } else {
      this.subscribeToSaveResponse(this.consommationPchEService.create(consommationPchE));
    }
  }

  trackBeneficiaireById(index: number, item: IBeneficiaire): string {
    return item.id!;
  }

  trackStrategiePchEById(index: number, item: IStrategiePchE): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsommationPchE>>): void {
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

  protected updateForm(consommationPchE: IConsommationPchE): void {
    this.editForm.patchValue({
      id: consommationPchE.id,
      date: consommationPchE.date ? consommationPchE.date.format(DATE_TIME_FORMAT) : null,
      montantCotisations: consommationPchE.montantCotisations,
      nbHeures: consommationPchE.nbHeures,
      beneficiaire: consommationPchE.beneficiaire,
      strategiePchE: consommationPchE.strategiePchE,
    });

    this.beneficiairesSharedCollection = this.beneficiaireService.addBeneficiaireToCollectionIfMissing(
      this.beneficiairesSharedCollection,
      consommationPchE.beneficiaire
    );
    this.strategiePchESSharedCollection = this.strategiePchEService.addStrategiePchEToCollectionIfMissing(
      this.strategiePchESSharedCollection,
      consommationPchE.strategiePchE
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

    this.strategiePchEService
      .query()
      .pipe(map((res: HttpResponse<IStrategiePchE[]>) => res.body ?? []))
      .pipe(
        map((strategiePchES: IStrategiePchE[]) =>
          this.strategiePchEService.addStrategiePchEToCollectionIfMissing(strategiePchES, this.editForm.get('strategiePchE')!.value)
        )
      )
      .subscribe((strategiePchES: IStrategiePchE[]) => (this.strategiePchESSharedCollection = strategiePchES));
  }

  protected createFromForm(): IConsommationPchE {
    return {
      ...new ConsommationPchE(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? dayjs(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      montantCotisations: this.editForm.get(['montantCotisations'])!.value,
      nbHeures: this.editForm.get(['nbHeures'])!.value,
      beneficiaire: this.editForm.get(['beneficiaire'])!.value,
      strategiePchE: this.editForm.get(['strategiePchE'])!.value,
    };
  }
}
