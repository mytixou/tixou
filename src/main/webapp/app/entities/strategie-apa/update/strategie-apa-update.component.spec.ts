jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { StrategieApaService } from '../service/strategie-apa.service';
import { IStrategieApa, StrategieApa } from '../strategie-apa.model';
import { IAide } from 'app/entities/aide/aide.model';
import { AideService } from 'app/entities/aide/service/aide.service';

import { StrategieApaUpdateComponent } from './strategie-apa-update.component';

describe('StrategieApa Management Update Component', () => {
  let comp: StrategieApaUpdateComponent;
  let fixture: ComponentFixture<StrategieApaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let strategieApaService: StrategieApaService;
  let aideService: AideService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StrategieApaUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(StrategieApaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StrategieApaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    strategieApaService = TestBed.inject(StrategieApaService);
    aideService = TestBed.inject(AideService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Aide query and add missing value', () => {
      const strategieApa: IStrategieApa = { id: 456 };
      const aide: IAide = { id: 80020 };
      strategieApa.aide = aide;

      const aideCollection: IAide[] = [{ id: 72099 }];
      jest.spyOn(aideService, 'query').mockReturnValue(of(new HttpResponse({ body: aideCollection })));
      const additionalAides = [aide];
      const expectedCollection: IAide[] = [...additionalAides, ...aideCollection];
      jest.spyOn(aideService, 'addAideToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ strategieApa });
      comp.ngOnInit();

      expect(aideService.query).toHaveBeenCalled();
      expect(aideService.addAideToCollectionIfMissing).toHaveBeenCalledWith(aideCollection, ...additionalAides);
      expect(comp.aidesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const strategieApa: IStrategieApa = { id: 456 };
      const aide: IAide = { id: 84244 };
      strategieApa.aide = aide;

      activatedRoute.data = of({ strategieApa });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(strategieApa));
      expect(comp.aidesSharedCollection).toContain(aide);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StrategieApa>>();
      const strategieApa = { id: 123 };
      jest.spyOn(strategieApaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ strategieApa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: strategieApa }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(strategieApaService.update).toHaveBeenCalledWith(strategieApa);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StrategieApa>>();
      const strategieApa = new StrategieApa();
      jest.spyOn(strategieApaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ strategieApa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: strategieApa }));
      saveSubject.complete();

      // THEN
      expect(strategieApaService.create).toHaveBeenCalledWith(strategieApa);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StrategieApa>>();
      const strategieApa = { id: 123 };
      jest.spyOn(strategieApaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ strategieApa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(strategieApaService.update).toHaveBeenCalledWith(strategieApa);
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
