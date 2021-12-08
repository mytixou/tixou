jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { StrategieCiService } from '../service/strategie-ci.service';
import { IStrategieCi, StrategieCi } from '../strategie-ci.model';
import { IAide } from 'app/entities/aide/aide.model';
import { AideService } from 'app/entities/aide/service/aide.service';

import { StrategieCiUpdateComponent } from './strategie-ci-update.component';

describe('StrategieCi Management Update Component', () => {
  let comp: StrategieCiUpdateComponent;
  let fixture: ComponentFixture<StrategieCiUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let strategieCiService: StrategieCiService;
  let aideService: AideService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StrategieCiUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(StrategieCiUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StrategieCiUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    strategieCiService = TestBed.inject(StrategieCiService);
    aideService = TestBed.inject(AideService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Aide query and add missing value', () => {
      const strategieCi: IStrategieCi = { id: 456 };
      const aide: IAide = { id: 71 };
      strategieCi.aide = aide;

      const aideCollection: IAide[] = [{ id: 57654 }];
      jest.spyOn(aideService, 'query').mockReturnValue(of(new HttpResponse({ body: aideCollection })));
      const additionalAides = [aide];
      const expectedCollection: IAide[] = [...additionalAides, ...aideCollection];
      jest.spyOn(aideService, 'addAideToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ strategieCi });
      comp.ngOnInit();

      expect(aideService.query).toHaveBeenCalled();
      expect(aideService.addAideToCollectionIfMissing).toHaveBeenCalledWith(aideCollection, ...additionalAides);
      expect(comp.aidesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const strategieCi: IStrategieCi = { id: 456 };
      const aide: IAide = { id: 50689 };
      strategieCi.aide = aide;

      activatedRoute.data = of({ strategieCi });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(strategieCi));
      expect(comp.aidesSharedCollection).toContain(aide);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StrategieCi>>();
      const strategieCi = { id: 123 };
      jest.spyOn(strategieCiService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ strategieCi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: strategieCi }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(strategieCiService.update).toHaveBeenCalledWith(strategieCi);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StrategieCi>>();
      const strategieCi = new StrategieCi();
      jest.spyOn(strategieCiService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ strategieCi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: strategieCi }));
      saveSubject.complete();

      // THEN
      expect(strategieCiService.create).toHaveBeenCalledWith(strategieCi);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StrategieCi>>();
      const strategieCi = { id: 123 };
      jest.spyOn(strategieCiService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ strategieCi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(strategieCiService.update).toHaveBeenCalledWith(strategieCi);
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
