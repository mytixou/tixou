jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { StrategiePchEService } from '../service/strategie-pch-e.service';
import { IStrategiePchE, StrategiePchE } from '../strategie-pch-e.model';
import { IAide } from 'app/entities/aide/aide.model';
import { AideService } from 'app/entities/aide/service/aide.service';

import { StrategiePchEUpdateComponent } from './strategie-pch-e-update.component';

describe('StrategiePchE Management Update Component', () => {
  let comp: StrategiePchEUpdateComponent;
  let fixture: ComponentFixture<StrategiePchEUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let strategiePchEService: StrategiePchEService;
  let aideService: AideService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StrategiePchEUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(StrategiePchEUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StrategiePchEUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    strategiePchEService = TestBed.inject(StrategiePchEService);
    aideService = TestBed.inject(AideService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Aide query and add missing value', () => {
      const strategiePchE: IStrategiePchE = { id: 456 };
      const aide: IAide = { id: 60680 };
      strategiePchE.aide = aide;

      const aideCollection: IAide[] = [{ id: 4398 }];
      jest.spyOn(aideService, 'query').mockReturnValue(of(new HttpResponse({ body: aideCollection })));
      const additionalAides = [aide];
      const expectedCollection: IAide[] = [...additionalAides, ...aideCollection];
      jest.spyOn(aideService, 'addAideToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ strategiePchE });
      comp.ngOnInit();

      expect(aideService.query).toHaveBeenCalled();
      expect(aideService.addAideToCollectionIfMissing).toHaveBeenCalledWith(aideCollection, ...additionalAides);
      expect(comp.aidesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const strategiePchE: IStrategiePchE = { id: 456 };
      const aide: IAide = { id: 49635 };
      strategiePchE.aide = aide;

      activatedRoute.data = of({ strategiePchE });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(strategiePchE));
      expect(comp.aidesSharedCollection).toContain(aide);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StrategiePchE>>();
      const strategiePchE = { id: 123 };
      jest.spyOn(strategiePchEService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ strategiePchE });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: strategiePchE }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(strategiePchEService.update).toHaveBeenCalledWith(strategiePchE);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StrategiePchE>>();
      const strategiePchE = new StrategiePchE();
      jest.spyOn(strategiePchEService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ strategiePchE });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: strategiePchE }));
      saveSubject.complete();

      // THEN
      expect(strategiePchEService.create).toHaveBeenCalledWith(strategiePchE);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StrategiePchE>>();
      const strategiePchE = { id: 123 };
      jest.spyOn(strategiePchEService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ strategiePchE });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(strategiePchEService.update).toHaveBeenCalledWith(strategiePchE);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackAideById', () => {
      it('Should return tracked Aide primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackAideById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
