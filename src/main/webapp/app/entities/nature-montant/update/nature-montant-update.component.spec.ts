jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { NatureMontantService } from '../service/nature-montant.service';
import { INatureMontant, NatureMontant } from '../nature-montant.model';
import { IStrategieCi } from 'app/entities/strategie-ci/strategie-ci.model';
import { StrategieCiService } from 'app/entities/strategie-ci/service/strategie-ci.service';
import { IStrategieApa } from 'app/entities/strategie-apa/strategie-apa.model';
import { StrategieApaService } from 'app/entities/strategie-apa/service/strategie-apa.service';
import { IStrategiePch } from 'app/entities/strategie-pch/strategie-pch.model';
import { StrategiePchService } from 'app/entities/strategie-pch/service/strategie-pch.service';
import { IStrategiePchE } from 'app/entities/strategie-pch-e/strategie-pch-e.model';
import { StrategiePchEService } from 'app/entities/strategie-pch-e/service/strategie-pch-e.service';

import { NatureMontantUpdateComponent } from './nature-montant-update.component';

describe('NatureMontant Management Update Component', () => {
  let comp: NatureMontantUpdateComponent;
  let fixture: ComponentFixture<NatureMontantUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let natureMontantService: NatureMontantService;
  let strategieCiService: StrategieCiService;
  let strategieApaService: StrategieApaService;
  let strategiePchService: StrategiePchService;
  let strategiePchEService: StrategiePchEService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NatureMontantUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(NatureMontantUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NatureMontantUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    natureMontantService = TestBed.inject(NatureMontantService);
    strategieCiService = TestBed.inject(StrategieCiService);
    strategieApaService = TestBed.inject(StrategieApaService);
    strategiePchService = TestBed.inject(StrategiePchService);
    strategiePchEService = TestBed.inject(StrategiePchEService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call StrategieCi query and add missing value', () => {
      const natureMontant: INatureMontant = { id: 456 };
      const strategie: IStrategieCi = { id: 6334 };
      natureMontant.strategie = strategie;

      const strategieCiCollection: IStrategieCi[] = [{ id: 61824 }];
      jest.spyOn(strategieCiService, 'query').mockReturnValue(of(new HttpResponse({ body: strategieCiCollection })));
      const additionalStrategieCis = [strategie];
      const expectedCollection: IStrategieCi[] = [...additionalStrategieCis, ...strategieCiCollection];
      jest.spyOn(strategieCiService, 'addStrategieCiToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ natureMontant });
      comp.ngOnInit();

      expect(strategieCiService.query).toHaveBeenCalled();
      expect(strategieCiService.addStrategieCiToCollectionIfMissing).toHaveBeenCalledWith(strategieCiCollection, ...additionalStrategieCis);
      expect(comp.strategieCisSharedCollection).toEqual(expectedCollection);
    });

    it('Should call StrategieApa query and add missing value', () => {
      const natureMontant: INatureMontant = { id: 456 };
      const strategie: IStrategieApa = { id: 39007 };
      natureMontant.strategie = strategie;

      const strategieApaCollection: IStrategieApa[] = [{ id: 17269 }];
      jest.spyOn(strategieApaService, 'query').mockReturnValue(of(new HttpResponse({ body: strategieApaCollection })));
      const additionalStrategieApas = [strategie];
      const expectedCollection: IStrategieApa[] = [...additionalStrategieApas, ...strategieApaCollection];
      jest.spyOn(strategieApaService, 'addStrategieApaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ natureMontant });
      comp.ngOnInit();

      expect(strategieApaService.query).toHaveBeenCalled();
      expect(strategieApaService.addStrategieApaToCollectionIfMissing).toHaveBeenCalledWith(
        strategieApaCollection,
        ...additionalStrategieApas
      );
      expect(comp.strategieApasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call StrategiePch query and add missing value', () => {
      const natureMontant: INatureMontant = { id: 456 };
      const strategie: IStrategiePch = { id: 78882 };
      natureMontant.strategie = strategie;

      const strategiePchCollection: IStrategiePch[] = [{ id: 75499 }];
      jest.spyOn(strategiePchService, 'query').mockReturnValue(of(new HttpResponse({ body: strategiePchCollection })));
      const additionalStrategiePches = [strategie];
      const expectedCollection: IStrategiePch[] = [...additionalStrategiePches, ...strategiePchCollection];
      jest.spyOn(strategiePchService, 'addStrategiePchToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ natureMontant });
      comp.ngOnInit();

      expect(strategiePchService.query).toHaveBeenCalled();
      expect(strategiePchService.addStrategiePchToCollectionIfMissing).toHaveBeenCalledWith(
        strategiePchCollection,
        ...additionalStrategiePches
      );
      expect(comp.strategiePchesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call StrategiePchE query and add missing value', () => {
      const natureMontant: INatureMontant = { id: 456 };
      const strategie: IStrategiePchE = { id: 81228 };
      natureMontant.strategie = strategie;

      const strategiePchECollection: IStrategiePchE[] = [{ id: 26310 }];
      jest.spyOn(strategiePchEService, 'query').mockReturnValue(of(new HttpResponse({ body: strategiePchECollection })));
      const additionalStrategiePchES = [strategie];
      const expectedCollection: IStrategiePchE[] = [...additionalStrategiePchES, ...strategiePchECollection];
      jest.spyOn(strategiePchEService, 'addStrategiePchEToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ natureMontant });
      comp.ngOnInit();

      expect(strategiePchEService.query).toHaveBeenCalled();
      expect(strategiePchEService.addStrategiePchEToCollectionIfMissing).toHaveBeenCalledWith(
        strategiePchECollection,
        ...additionalStrategiePchES
      );
      expect(comp.strategiePchESSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const natureMontant: INatureMontant = { id: 456 };
      const strategie: IStrategieCi = { id: 30824 };
      natureMontant.strategie = strategie;
      const strategie: IStrategieApa = { id: 6178 };
      natureMontant.strategie = strategie;
      const strategie: IStrategiePch = { id: 94373 };
      natureMontant.strategie = strategie;
      const strategie: IStrategiePchE = { id: 43800 };
      natureMontant.strategie = strategie;

      activatedRoute.data = of({ natureMontant });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(natureMontant));
      expect(comp.strategieCisSharedCollection).toContain(strategie);
      expect(comp.strategieApasSharedCollection).toContain(strategie);
      expect(comp.strategiePchesSharedCollection).toContain(strategie);
      expect(comp.strategiePchESSharedCollection).toContain(strategie);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NatureMontant>>();
      const natureMontant = { id: 123 };
      jest.spyOn(natureMontantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ natureMontant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: natureMontant }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(natureMontantService.update).toHaveBeenCalledWith(natureMontant);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NatureMontant>>();
      const natureMontant = new NatureMontant();
      jest.spyOn(natureMontantService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ natureMontant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: natureMontant }));
      saveSubject.complete();

      // THEN
      expect(natureMontantService.create).toHaveBeenCalledWith(natureMontant);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NatureMontant>>();
      const natureMontant = { id: 123 };
      jest.spyOn(natureMontantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ natureMontant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(natureMontantService.update).toHaveBeenCalledWith(natureMontant);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackStrategieCiById', () => {
      it('Should return tracked StrategieCi primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackStrategieCiById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackStrategieApaById', () => {
      it('Should return tracked StrategieApa primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackStrategieApaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackStrategiePchById', () => {
      it('Should return tracked StrategiePch primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackStrategiePchById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackStrategiePchEById', () => {
      it('Should return tracked StrategiePchE primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackStrategiePchEById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
