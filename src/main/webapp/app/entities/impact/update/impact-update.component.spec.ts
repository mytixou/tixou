jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ImpactService } from '../service/impact.service';
import { IImpact, Impact } from '../impact.model';
import { IReponse } from 'app/entities/reponse/reponse.model';
import { ReponseService } from 'app/entities/reponse/service/reponse.service';

import { ImpactUpdateComponent } from './impact-update.component';

describe('Impact Management Update Component', () => {
  let comp: ImpactUpdateComponent;
  let fixture: ComponentFixture<ImpactUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let impactService: ImpactService;
  let reponseService: ReponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ImpactUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ImpactUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ImpactUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    impactService = TestBed.inject(ImpactService);
    reponseService = TestBed.inject(ReponseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Reponse query and add missing value', () => {
      const impact: IImpact = { id: 456 };
      const reponse: IReponse = { id: 32868 };
      impact.reponse = reponse;

      const reponseCollection: IReponse[] = [{ id: 45433 }];
      jest.spyOn(reponseService, 'query').mockReturnValue(of(new HttpResponse({ body: reponseCollection })));
      const additionalReponses = [reponse];
      const expectedCollection: IReponse[] = [...additionalReponses, ...reponseCollection];
      jest.spyOn(reponseService, 'addReponseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ impact });
      comp.ngOnInit();

      expect(reponseService.query).toHaveBeenCalled();
      expect(reponseService.addReponseToCollectionIfMissing).toHaveBeenCalledWith(reponseCollection, ...additionalReponses);
      expect(comp.reponsesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const impact: IImpact = { id: 456 };
      const reponse: IReponse = { id: 74616 };
      impact.reponse = reponse;

      activatedRoute.data = of({ impact });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(impact));
      expect(comp.reponsesSharedCollection).toContain(reponse);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Impact>>();
      const impact = { id: 123 };
      jest.spyOn(impactService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ impact });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: impact }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(impactService.update).toHaveBeenCalledWith(impact);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Impact>>();
      const impact = new Impact();
      jest.spyOn(impactService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ impact });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: impact }));
      saveSubject.complete();

      // THEN
      expect(impactService.create).toHaveBeenCalledWith(impact);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Impact>>();
      const impact = { id: 123 };
      jest.spyOn(impactService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ impact });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(impactService.update).toHaveBeenCalledWith(impact);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackReponseById', () => {
      it('Should return tracked Reponse primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackReponseById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
