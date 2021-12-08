import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IConsommationApa, ConsommationApa } from '../consommation-apa.model';
import { ConsommationApaService } from '../service/consommation-apa.service';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';
import { IStrategieApa } from 'app/entities/strategie-apa/strategie-apa.model';
import { StrategieApaService } from 'app/entities/strategie-apa/service/strategie-apa.service';

@Component({
  selector: 'jhi-consommation-apa-update',
  templateUrl: './consommation-apa-update.component.html',
})
export class ConsommationApaUpdateComponent implements OnInit {
  isSaving = false;

  beneficiairesSharedCollection: IBeneficiaire[] = [];
  strategieApasSharedCollection: IStrategieApa[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    montantCotisations: [],
    nbHeures: [],
    beneficiaire: [],
    strategieApa: [],
  });

  constructor(
    protected consommationApaService: ConsommationApaService,
    protected beneficiaireService: BeneficiaireService,
    protected strategieApaService: StrategieApaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consommationApa }) => {
      if (consommationApa.id === undefined) {
        const today = dayjs().startOf('day');
        consommationApa.date = today;
      }

      this.updateForm(consommationApa);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const consommationApa = this.createFromForm();
    if (consommationApa.id !== undefined) {
      this.subscribeToSaveResponse(this.consommationApaService.update(consommationApa));
    } else {
      this.subscribeToSaveResponse(this.consommationApaService.create(consommationApa));
    }
  }

  trackBeneficiaireById(index: number, item: IBeneficiaire): string {
    return item.id!;
  }

  trackStrategieApaById(index: number, item: IStrategieApa): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsommationApa>>): void {
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

  protected updateForm(consommationApa: IConsommationApa): void {
    this.editForm.patchValue({
      id: consommationApa.id,
      date: consommationApa.date ? consommationApa.date.format(DATE_TIME_FORMAT) : null,
      montantCotisations: consommationApa.montantCotisations,
      nbHeures: consommationApa.nbHeures,
      beneficiaire: consommationApa.beneficiaire,
      strategieApa: consommationApa.strategieApa,
    });

    this.beneficiairesSharedCollection = this.beneficiaireService.addBeneficiaireToCollectionIfMissing(
      this.beneficiairesSharedCollection,
      consommationApa.beneficiaire
    );
    this.strategieApasSharedCollection = this.strategieApaService.addStrategieApaToCollectionIfMissing(
      this.strategieApasSharedCollection,
      consommationApa.strategieApa
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

    this.strategieApaService
      .query()
      .pipe(map((res: HttpResponse<IStrategieApa[]>) => res.body ?? []))
      .pipe(
        map((strategieApas: IStrategieApa[]) =>
          this.strategieApaService.addStrategieApaToCollectionIfMissing(strategieApas, this.editForm.get('strategieApa')!.value)
        )
      )
      .subscribe((strategieApas: IStrategieApa[]) => (this.strategieApasSharedCollection = strategieApas));
  }

  protected createFromForm(): IConsommationApa {
    return {
      ...new ConsommationApa(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? dayjs(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      montantCotisations: this.editForm.get(['montantCotisations'])!.value,
      nbHeures: this.editForm.get(['nbHeures'])!.value,
      beneficiaire: this.editForm.get(['beneficiaire'])!.value,
      strategieApa: this.editForm.get(['strategieApa'])!.value,
    };
  }
}
