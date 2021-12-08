jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { StrategiePchService } from '../service/strategie-pch.service';
import { IStrategiePch, StrategiePch } from '../strategie-pch.model';
import { IAide } from 'app/entities/aide/aide.model';
import { AideService } from 'app/entities/aide/service/aide.service';

import { StrategiePchUpdateComponent } from './strategie-pch-update.component';

describe('StrategiePch Management Update Component', () => {
  let comp: StrategiePchUpdateComponent;
  let fixture: ComponentFixture<StrategiePchUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let strategiePchService: StrategiePchService;
  let aideService: AideService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StrategiePchUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(StrategiePchUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StrategiePchUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    strategiePchService = TestBed.inject(StrategiePchService);
    aideService = TestBed.inject(AideService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Aide query and add missing value', () => {
      const strategiePch: IStrategiePch = { id: 456 };
      const aide: IAide = { id: 12861 };
      strategiePch.aide = aide;

      const aideCollection: IAide[] = [{ id: 67232 }];
      jest.spyOn(aideService, 'query').mockReturnValue(of(new HttpResponse({ body: aideCollection })));
      const additionalAides = [aide];
      const expectedCollection: IAide[] = [...additionalAides, ...aideCollection];
      jest.spyOn(aideService, 'addAideToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ strategiePch });
      comp.ngOnInit();

      expect(aideService.query).toHaveBeenCalled();
      expect(aideService.addAideToCollectionIfMissing).toHaveBeenCalledWith(aideCollection, ...additionalAides);
      expect(comp.aidesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const strategiePch: IStrategiePch = { id: 456 };
      const aide: IAide = { id: 42618 };
      strategiePch.aide = aide;

      activatedRoute.data = of({ strategiePch });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(strategiePch));
      expect(comp.aidesSharedCollection).toContain(aide);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StrategiePch>>();
      const strategiePch = { id: 123 };
      jest.spyOn(strategiePchService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ strategiePch });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: strategiePch }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(strategiePchService.update).toHaveBeenCalledWith(strategiePch);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StrategiePch>>();
      const strategiePch = new StrategiePch();
      jest.spyOn(strategiePchService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ strategiePch });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: strategiePch }));
      saveSubject.complete();

      // THEN
      expect(strategiePchService.create).toHaveBeenCalledWith(strategiePch);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StrategiePch>>();
      const strategiePch = { id: 123 };
      jest.spyOn(strategiePchService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ strategiePch });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(strategiePchService.update).toHaveBeenCalledWith(strategiePch);
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
