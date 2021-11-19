import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IDossier, Dossier } from '../dossier.model';
import { DossierService } from '../service/dossier.service';
import { ICommanditaire } from 'app/entities/commanditaire/commanditaire.model';
import { CommanditaireService } from 'app/entities/commanditaire/service/commanditaire.service';

@Component({
  selector: 'jhi-dossier-update',
  templateUrl: './dossier-update.component.html',
})
export class DossierUpdateComponent implements OnInit {
  isSaving = false;

  commanditairesSharedCollection: ICommanditaire[] = [];

  editForm = this.fb.group({
    id: [],
    designation: [],
    description: [],
    dateCreation: [],
    dateCloture: [],
    commanditaire: [],
  });

  constructor(
    protected dossierService: DossierService,
    protected commanditaireService: CommanditaireService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dossier }) => {
      if (dossier.id === undefined) {
        const today = dayjs().startOf('day');
        dossier.dateCreation = today;
        dossier.dateCloture = today;
      }

      this.updateForm(dossier);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dossier = this.createFromForm();
    if (dossier.id !== undefined) {
      this.subscribeToSaveResponse(this.dossierService.update(dossier));
    } else {
      this.subscribeToSaveResponse(this.dossierService.create(dossier));
    }
  }

  trackCommanditaireById(index: number, item: ICommanditaire): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDossier>>): void {
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

  protected updateForm(dossier: IDossier): void {
    this.editForm.patchValue({
      id: dossier.id,
      designation: dossier.designation,
      description: dossier.description,
      dateCreation: dossier.dateCreation ? dossier.dateCreation.format(DATE_TIME_FORMAT) : null,
      dateCloture: dossier.dateCloture ? dossier.dateCloture.format(DATE_TIME_FORMAT) : null,
      commanditaire: dossier.commanditaire,
    });

    this.commanditairesSharedCollection = this.commanditaireService.addCommanditaireToCollectionIfMissing(
      this.commanditairesSharedCollection,
      dossier.commanditaire
    );
  }

  protected loadRelationshipsOptions(): void {
    this.commanditaireService
      .query()
      .pipe(map((res: HttpResponse<ICommanditaire[]>) => res.body ?? []))
      .pipe(
        map((commanditaires: ICommanditaire[]) =>
          this.commanditaireService.addCommanditaireToCollectionIfMissing(commanditaires, this.editForm.get('commanditaire')!.value)
        )
      )
      .subscribe((commanditaires: ICommanditaire[]) => (this.commanditairesSharedCollection = commanditaires));
  }

  protected createFromForm(): IDossier {
    return {
      ...new Dossier(),
      id: this.editForm.get(['id'])!.value,
      designation: this.editForm.get(['designation'])!.value,
      description: this.editForm.get(['description'])!.value,
      dateCreation: this.editForm.get(['dateCreation'])!.value
        ? dayjs(this.editForm.get(['dateCreation'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateCloture: this.editForm.get(['dateCloture'])!.value
        ? dayjs(this.editForm.get(['dateCloture'])!.value, DATE_TIME_FORMAT)
        : undefined,
      commanditaire: this.editForm.get(['commanditaire'])!.value,
    };
  }
}
