import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IReponse, Reponse } from '../reponse.model';
import { ReponseService } from '../service/reponse.service';
import { IQuestion } from 'app/entities/question/question.model';
import { QuestionService } from 'app/entities/question/service/question.service';
import { TypeDestination } from 'app/entities/enumerations/type-destination.model';

@Component({
  selector: 'jhi-reponse-update',
  templateUrl: './reponse-update.component.html',
})
export class ReponseUpdateComponent implements OnInit {
  isSaving = false;
  typeDestinationValues = Object.keys(TypeDestination);

  questionsSharedCollection: IQuestion[] = [];

  editForm = this.fb.group({
    id: [],
    designation: [],
    explication: [],
    typeQuestion: [],
    question: [],
  });

  constructor(
    protected reponseService: ReponseService,
    protected questionService: QuestionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reponse }) => {
      this.updateForm(reponse);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reponse = this.createFromForm();
    if (reponse.id !== undefined) {
      this.subscribeToSaveResponse(this.reponseService.update(reponse));
    } else {
      this.subscribeToSaveResponse(this.reponseService.create(reponse));
    }
  }

  trackQuestionById(index: number, item: IQuestion): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReponse>>): void {
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

  protected updateForm(reponse: IReponse): void {
    this.editForm.patchValue({
      id: reponse.id,
      designation: reponse.designation,
      explication: reponse.explication,
      typeQuestion: reponse.typeQuestion,
      question: reponse.question,
    });

    this.questionsSharedCollection = this.questionService.addQuestionToCollectionIfMissing(
      this.questionsSharedCollection,
      reponse.question
    );
  }

  protected loadRelationshipsOptions(): void {
    this.questionService
      .query()
      .pipe(map((res: HttpResponse<IQuestion[]>) => res.body ?? []))
      .pipe(
        map((questions: IQuestion[]) =>
          this.questionService.addQuestionToCollectionIfMissing(questions, this.editForm.get('question')!.value)
        )
      )
      .subscribe((questions: IQuestion[]) => (this.questionsSharedCollection = questions));
  }

  protected createFromForm(): IReponse {
    return {
      ...new Reponse(),
      id: this.editForm.get(['id'])!.value,
      designation: this.editForm.get(['designation'])!.value,
      explication: this.editForm.get(['explication'])!.value,
      typeQuestion: this.editForm.get(['typeQuestion'])!.value,
      question: this.editForm.get(['question'])!.value,
    };
  }
}
