import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICommanditaire, Commanditaire } from '../commanditaire.model';
import { CommanditaireService } from '../service/commanditaire.service';

@Component({
  selector: 'jhi-commanditaire-update',
  templateUrl: './commanditaire-update.component.html',
})
export class CommanditaireUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    idMetierInterne: [],
    prenom: [],
    nom: [],
    email: [],
    telephoneFixe: [],
    telephonePortable: [],
    connuDepuis: [],
  });

  constructor(protected commanditaireService: CommanditaireService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ commanditaire }) => {
      this.updateForm(commanditaire);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const commanditaire = this.createFromForm();
    if (commanditaire.id !== undefined) {
      this.subscribeToSaveResponse(this.commanditaireService.update(commanditaire));
    } else {
      this.subscribeToSaveResponse(this.commanditaireService.create(commanditaire));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommanditaire>>): void {
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

  protected updateForm(commanditaire: ICommanditaire): void {
    this.editForm.patchValue({
      id: commanditaire.id,
      idMetierInterne: commanditaire.idMetierInterne,
      prenom: commanditaire.prenom,
      nom: commanditaire.nom,
      email: commanditaire.email,
      telephoneFixe: commanditaire.telephoneFixe,
      telephonePortable: commanditaire.telephonePortable,
      connuDepuis: commanditaire.connuDepuis,
    });
  }

  protected createFromForm(): ICommanditaire {
    return {
      ...new Commanditaire(),
      id: this.editForm.get(['id'])!.value,
      idMetierInterne: this.editForm.get(['idMetierInterne'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      email: this.editForm.get(['email'])!.value,
      telephoneFixe: this.editForm.get(['telephoneFixe'])!.value,
      telephonePortable: this.editForm.get(['telephonePortable'])!.value,
      connuDepuis: this.editForm.get(['connuDepuis'])!.value,
    };
  }
}
