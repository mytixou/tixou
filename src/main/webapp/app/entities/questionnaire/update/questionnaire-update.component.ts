import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IQuestionnaire, Questionnaire } from '../questionnaire.model';
import { QuestionnaireService } from '../service/questionnaire.service';
import { IDossier } from 'app/entities/dossier/dossier.model';
import { DossierService } from 'app/entities/dossier/service/dossier.service';
import { IQuestion } from 'app/entities/question/question.model';
import { QuestionService } from 'app/entities/question/service/question.service';
import { TypeDestination } from 'app/entities/enumerations/type-destination.model';

@Component({
  selector: 'jhi-questionnaire-update',
  templateUrl: './questionnaire-update.component.html',
})
export class QuestionnaireUpdateComponent implements OnInit {
  isSaving = false;
  typeDestinationValues = Object.keys(TypeDestination);

  dossiersSharedCollection: IDossier[] = [];
  questionsSharedCollection: IQuestion[] = [];

  editForm = this.fb.group({
    id: [],
    designation: [],
    explication: [],
    typeQuestionnaire: [],
    dossier: [],
    questions: [],
  });

  constructor(
    protected questionnaireService: QuestionnaireService,
    protected dossierService: DossierService,
    protected questionService: QuestionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ questionnaire }) => {
      this.updateForm(questionnaire);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const questionnaire = this.createFromForm();
    if (questionnaire.id !== undefined) {
      this.subscribeToSaveResponse(this.questionnaireService.update(questionnaire));
    } else {
      this.subscribeToSaveResponse(this.questionnaireService.create(questionnaire));
    }
  }

  trackDossierById(index: number, item: IDossier): number {
    return item.id!;
  }

  trackQuestionById(index: number, item: IQuestion): number {
    return item.id!;
  }

  getSelectedQuestion(option: IQuestion, selectedVals?: IQuestion[]): IQuestion {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestionnaire>>): void {
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

  protected updateForm(questionnaire: IQuestionnaire): void {
    this.editForm.patchValue({
      id: questionnaire.id,
      designation: questionnaire.designation,
      explication: questionnaire.explication,
      typeQuestionnaire: questionnaire.typeQuestionnaire,
      dossier: questionnaire.dossier,
      questions: questionnaire.questions,
    });

    this.dossiersSharedCollection = this.dossierService.addDossierToCollectionIfMissing(
      this.dossiersSharedCollection,
      questionnaire.dossier
    );
    this.questionsSharedCollection = this.questionService.addQuestionToCollectionIfMissing(
      this.questionsSharedCollection,
      ...(questionnaire.questions ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.dossierService
      .query()
      .pipe(map((res: HttpResponse<IDossier[]>) => res.body ?? []))
      .pipe(
        map((dossiers: IDossier[]) => this.dossierService.addDossierToCollectionIfMissing(dossiers, this.editForm.get('dossier')!.value))
      )
      .subscribe((dossiers: IDossier[]) => (this.dossiersSharedCollection = dossiers));

    this.questionService
      .query()
      .pipe(map((res: HttpResponse<IQuestion[]>) => res.body ?? []))
      .pipe(
        map((questions: IQuestion[]) =>
          this.questionService.addQuestionToCollectionIfMissing(questions, ...(this.editForm.get('questions')!.value ?? []))
        )
      )
      .subscribe((questions: IQuestion[]) => (this.questionsSharedCollection = questions));
  }

  protected createFromForm(): IQuestionnaire {
    return {
      ...new Questionnaire(),
      id: this.editForm.get(['id'])!.value,
      designation: this.editForm.get(['designation'])!.value,
      explication: this.editForm.get(['explication'])!.value,
      typeQuestionnaire: this.editForm.get(['typeQuestionnaire'])!.value,
      dossier: this.editForm.get(['dossier'])!.value,
      questions: this.editForm.get(['questions'])!.value,
    };
  }
}
