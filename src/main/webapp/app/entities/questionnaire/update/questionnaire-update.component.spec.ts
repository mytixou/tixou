jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { QuestionnaireService } from '../service/questionnaire.service';
import { IQuestionnaire, Questionnaire } from '../questionnaire.model';
import { IDossier } from 'app/entities/dossier/dossier.model';
import { DossierService } from 'app/entities/dossier/service/dossier.service';
import { IQuestion } from 'app/entities/question/question.model';
import { QuestionService } from 'app/entities/question/service/question.service';

import { QuestionnaireUpdateComponent } from './questionnaire-update.component';

describe('Component Tests', () => {
  describe('Questionnaire Management Update Component', () => {
    let comp: QuestionnaireUpdateComponent;
    let fixture: ComponentFixture<QuestionnaireUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let questionnaireService: QuestionnaireService;
    let dossierService: DossierService;
    let questionService: QuestionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [QuestionnaireUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(QuestionnaireUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QuestionnaireUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      questionnaireService = TestBed.inject(QuestionnaireService);
      dossierService = TestBed.inject(DossierService);
      questionService = TestBed.inject(QuestionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Dossier query and add missing value', () => {
        const questionnaire: IQuestionnaire = { id: 456 };
        const dossier: IDossier = { id: 73325 };
        questionnaire.dossier = dossier;

        const dossierCollection: IDossier[] = [{ id: 25813 }];
        jest.spyOn(dossierService, 'query').mockReturnValue(of(new HttpResponse({ body: dossierCollection })));
        const additionalDossiers = [dossier];
        const expectedCollection: IDossier[] = [...additionalDossiers, ...dossierCollection];
        jest.spyOn(dossierService, 'addDossierToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ questionnaire });
        comp.ngOnInit();

        expect(dossierService.query).toHaveBeenCalled();
        expect(dossierService.addDossierToCollectionIfMissing).toHaveBeenCalledWith(dossierCollection, ...additionalDossiers);
        expect(comp.dossiersSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Question query and add missing value', () => {
        const questionnaire: IQuestionnaire = { id: 456 };
        const questions: IQuestion[] = [{ id: 17996 }];
        questionnaire.questions = questions;

        const questionCollection: IQuestion[] = [{ id: 58303 }];
        jest.spyOn(questionService, 'query').mockReturnValue(of(new HttpResponse({ body: questionCollection })));
        const additionalQuestions = [...questions];
        const expectedCollection: IQuestion[] = [...additionalQuestions, ...questionCollection];
        jest.spyOn(questionService, 'addQuestionToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ questionnaire });
        comp.ngOnInit();

        expect(questionService.query).toHaveBeenCalled();
        expect(questionService.addQuestionToCollectionIfMissing).toHaveBeenCalledWith(questionCollection, ...additionalQuestions);
        expect(comp.questionsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const questionnaire: IQuestionnaire = { id: 456 };
        const dossier: IDossier = { id: 12773 };
        questionnaire.dossier = dossier;
        const questions: IQuestion = { id: 52789 };
        questionnaire.questions = [questions];

        activatedRoute.data = of({ questionnaire });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(questionnaire));
        expect(comp.dossiersSharedCollection).toContain(dossier);
        expect(comp.questionsSharedCollection).toContain(questions);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Questionnaire>>();
        const questionnaire = { id: 123 };
        jest.spyOn(questionnaireService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ questionnaire });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: questionnaire }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(questionnaireService.update).toHaveBeenCalledWith(questionnaire);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Questionnaire>>();
        const questionnaire = new Questionnaire();
        jest.spyOn(questionnaireService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ questionnaire });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: questionnaire }));
        saveSubject.complete();

        // THEN
        expect(questionnaireService.create).toHaveBeenCalledWith(questionnaire);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Questionnaire>>();
        const questionnaire = { id: 123 };
        jest.spyOn(questionnaireService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ questionnaire });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(questionnaireService.update).toHaveBeenCalledWith(questionnaire);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackDossierById', () => {
        it('Should return tracked Dossier primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackDossierById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackQuestionById', () => {
        it('Should return tracked Question primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackQuestionById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });

    describe('Getting selected relationships', () => {
      describe('getSelectedQuestion', () => {
        it('Should return option if no Question is selected', () => {
          const option = { id: 123 };
          const result = comp.getSelectedQuestion(option);
          expect(result === option).toEqual(true);
        });

        it('Should return selected Question for according option', () => {
          const option = { id: 123 };
          const selected = { id: 123 };
          const selected2 = { id: 456 };
          const result = comp.getSelectedQuestion(option, [selected2, selected]);
          expect(result === selected).toEqual(true);
          expect(result === selected2).toEqual(false);
          expect(result === option).toEqual(false);
        });

        it('Should return option if this Question is not selected', () => {
          const option = { id: 123 };
          const selected = { id: 456 };
          const result = comp.getSelectedQuestion(option, [selected]);
          expect(result === option).toEqual(true);
          expect(result === selected).toEqual(false);
        });
      });
    });
  });
});
