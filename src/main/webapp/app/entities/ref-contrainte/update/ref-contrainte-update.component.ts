import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IRefContrainte, RefContrainte } from '../ref-contrainte.model';
import { RefContrainteService } from '../service/ref-contrainte.service';
import { TypeContrainte } from 'app/entities/enumerations/type-contrainte.model';
import { TypeDestination } from 'app/entities/enumerations/type-destination.model';

@Component({
  selector: 'jhi-ref-contrainte-update',
  templateUrl: './ref-contrainte-update.component.html',
})
export class RefContrainteUpdateComponent implements OnInit {
  isSaving = false;
  typeContrainteValues = Object.keys(TypeContrainte);
  typeDestinationValues = Object.keys(TypeDestination);

  editForm = this.fb.group({
    id: [],
    designation: [],
    typeContrainte: [],
    typeDestination: [],
    explication: [],
  });

  constructor(protected refContrainteService: RefContrainteService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refContrainte }) => {
      this.updateForm(refContrainte);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const refContrainte = this.createFromForm();
    if (refContrainte.id !== undefined) {
      this.subscribeToSaveResponse(this.refContrainteService.update(refContrainte));
    } else {
      this.subscribeToSaveResponse(this.refContrainteService.create(refContrainte));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefContrainte>>): void {
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

  protected updateForm(refContrainte: IRefContrainte): void {
    this.editForm.patchValue({
      id: refContrainte.id,
      designation: refContrainte.designation,
      typeContrainte: refContrainte.typeContrainte,
      typeDestination: refContrainte.typeDestination,
      explication: refContrainte.explication,
    });
  }

  protected createFromForm(): IRefContrainte {
    return {
      ...new RefContrainte(),
      id: this.editForm.get(['id'])!.value,
      designation: this.editForm.get(['designation'])!.value,
      typeContrainte: this.editForm.get(['typeContrainte'])!.value,
      typeDestination: this.editForm.get(['typeDestination'])!.value,
      explication: this.editForm.get(['explication'])!.value,
    };
  }
}
