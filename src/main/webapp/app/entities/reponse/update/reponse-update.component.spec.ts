jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ReponseService } from '../service/reponse.service';
import { IReponse, Reponse } from '../reponse.model';
import { IQuestion } from 'app/entities/question/question.model';
import { QuestionService } from 'app/entities/question/service/question.service';

import { ReponseUpdateComponent } from './reponse-update.component';

describe('Reponse Management Update Component', () => {
  let comp: ReponseUpdateComponent;
  let fixture: ComponentFixture<ReponseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reponseService: ReponseService;
  let questionService: QuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ReponseUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ReponseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReponseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reponseService = TestBed.inject(ReponseService);
    questionService = TestBed.inject(QuestionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Question query and add missing value', () => {
      const reponse: IReponse = { id: 456 };
      const question: IQuestion = { id: 43524 };
      reponse.question = question;

      const questionCollection: IQuestion[] = [{ id: 17487 }];
      jest.spyOn(questionService, 'query').mockReturnValue(of(new HttpResponse({ body: questionCollection })));
      const additionalQuestions = [question];
      const expectedCollection: IQuestion[] = [...additionalQuestions, ...questionCollection];
      jest.spyOn(questionService, 'addQuestionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reponse });
      comp.ngOnInit();

      expect(questionService.query).toHaveBeenCalled();
      expect(questionService.addQuestionToCollectionIfMissing).toHaveBeenCalledWith(questionCollection, ...additionalQuestions);
      expect(comp.questionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const reponse: IReponse = { id: 456 };
      const question: IQuestion = { id: 77108 };
      reponse.question = question;

      activatedRoute.data = of({ reponse });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(reponse));
      expect(comp.questionsSharedCollection).toContain(question);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reponse>>();
      const reponse = { id: 123 };
      jest.spyOn(reponseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reponse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reponse }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(reponseService.update).toHaveBeenCalledWith(reponse);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reponse>>();
      const reponse = new Reponse();
      jest.spyOn(reponseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reponse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reponse }));
      saveSubject.complete();

      // THEN
      expect(reponseService.create).toHaveBeenCalledWith(reponse);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reponse>>();
      const reponse = { id: 123 };
      jest.spyOn(reponseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reponse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reponseService.update).toHaveBeenCalledWith(reponse);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackQuestionById', () => {
      it('Should return tracked Question primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackQuestionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
