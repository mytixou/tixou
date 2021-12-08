jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { NatureActiviteService } from '../service/nature-activite.service';
import { INatureActivite, NatureActivite } from '../nature-activite.model';
import { IStrategieCi } from 'app/entities/strategie-ci/strategie-ci.model';
import { StrategieCiService } from 'app/entities/strategie-ci/service/strategie-ci.service';
import { IStrategieApa } from 'app/entities/strategie-apa/strategie-apa.model';
import { StrategieApaService } from 'app/entities/strategie-apa/service/strategie-apa.service';
import { IStrategiePch } from 'app/entities/strategie-pch/strategie-pch.model';
import { StrategiePchService } from 'app/entities/strategie-pch/service/strategie-pch.service';
import { IStrategiePchE } from 'app/entities/strategie-pch-e/strategie-pch-e.model';
import { StrategiePchEService } from 'app/entities/strategie-pch-e/service/strategie-pch-e.service';

import { NatureActiviteUpdateComponent } from './nature-activite-update.component';

describe('NatureActivite Management Update Component', () => {
  let comp: NatureActiviteUpdateComponent;
  let fixture: ComponentFixture<NatureActiviteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let natureActiviteService: NatureActiviteService;
  let strategieCiService: StrategieCiService;
  let strategieApaService: StrategieApaService;
  let strategiePchService: StrategiePchService;
  let strategiePchEService: StrategiePchEService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NatureActiviteUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(NatureActiviteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NatureActiviteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    natureActiviteService = TestBed.inject(NatureActiviteService);
    strategieCiService = TestBed.inject(StrategieCiService);
    strategieApaService = TestBed.inject(StrategieApaService);
    strategiePchService = TestBed.inject(StrategiePchService);
    strategiePchEService = TestBed.inject(StrategiePchEService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call StrategieCi query and add missing value', () => {
      const natureActivite: INatureActivite = { id: 456 };
      const strategie: IStrategieCi = { id: 22009 };
      natureActivite.strategie = strategie;

      const strategieCiCollection: IStrategieCi[] = [{ id: 42145 }];
      jest.spyOn(strategieCiService, 'query').mockReturnValue(of(new HttpResponse({ body: strategieCiCollection })));
      const additionalStrategieCis = [strategie];
      const expectedCollection: IStrategieCi[] = [...additionalStrategieCis, ...strategieCiCollection];
      jest.spyOn(strategieCiService, 'addStrategieCiToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ natureActivite });
      comp.ngOnInit();

      expect(strategieCiService.query).toHaveBeenCalled();
      expect(strategieCiService.addStrategieCiToCollectionIfMissing).toHaveBeenCalledWith(strategieCiCollection, ...additionalStrategieCis);
      expect(comp.strategieCisSharedCollection).toEqual(expectedCollection);
    });

    it('Should call StrategieApa query and add missing value', () => {
      const natureActivite: INatureActivite = { id: 456 };
      const strategie: IStrategieApa = { id: 3533 };
      natureActivite.strategie = strategie;

      const strategieApaCollection: IStrategieApa[] = [{ id: 87916 }];
      jest.spyOn(strategieApaService, 'query').mockReturnValue(of(new HttpResponse({ body: strategieApaCollection })));
      const additionalStrategieApas = [strategie];
      const expectedCollection: IStrategieApa[] = [...additionalStrategieApas, ...strategieApaCollection];
      jest.spyOn(strategieApaService, 'addStrategieApaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ natureActivite });
      comp.ngOnInit();

      expect(strategieApaService.query).toHaveBeenCalled();
      expect(strategieApaService.addStrategieApaToCollectionIfMissing).toHaveBeenCalledWith(
        strategieApaCollection,
        ...additionalStrategieApas
      );
      expect(comp.strategieApasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call StrategiePch query and add missing value', () => {
      const natureActivite: INatureActivite = { id: 456 };
      const strategie: IStrategiePch = { id: 96753 };
      natureActivite.strategie = strategie;

      const strategiePchCollection: IStrategiePch[] = [{ id: 64190 }];
      jest.spyOn(strategiePchService, 'query').mockReturnValue(of(new HttpResponse({ body: strategiePchCollection })));
      const additionalStrategiePches = [strategie];
      const expectedCollection: IStrategiePch[] = [...additionalStrategiePches, ...strategiePchCollection];
      jest.spyOn(strategiePchService, 'addStrategiePchToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ natureActivite });
      comp.ngOnInit();

      expect(strategiePchService.query).toHaveBeenCalled();
      expect(strategiePchService.addStrategiePchToCollectionIfMissing).toHaveBeenCalledWith(
        strategiePchCollection,
        ...additionalStrategiePches
      );
      expect(comp.strategiePchesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call StrategiePchE query and add missing value', () => {
      const natureActivite: INatureActivite = { id: 456 };
      const strategie: IStrategiePchE = { id: 75289 };
      natureActivite.strategie = strategie;

      const strategiePchECollection: IStrategiePchE[] = [{ id: 80171 }];
      jest.spyOn(strategiePchEService, 'query').mockReturnValue(of(new HttpResponse({ body: strategiePchECollection })));
      const additionalStrategiePchES = [strategie];
      const expectedCollection: IStrategiePchE[] = [...additionalStrategiePchES, ...strategiePchECollection];
      jest.spyOn(strategiePchEService, 'addStrategiePchEToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ natureActivite });
      comp.ngOnInit();

      expect(strategiePchEService.query).toHaveBeenCalled();
      expect(strategiePchEService.addStrategiePchEToCollectionIfMissing).toHaveBeenCalledWith(
        strategiePchECollection,
        ...additionalStrategiePchES
      );
      expect(comp.strategiePchESSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const natureActivite: INatureActivite = { id: 456 };
      const strategie: IStrategieCi = { id: 61326 };
      natureActivite.strategie = strategie;
      const strategie: IStrategieApa = { id: 88013 };
      natureActivite.strategie = strategie;
      const strategie: IStrategiePch = { id: 93038 };
      natureActivite.strategie = strategie;
      const strategie: IStrategiePchE = { id: 12057 };
      natureActivite.strategie = strategie;

      activatedRoute.data = of({ natureActivite });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(natureActivite));
      expect(comp.strategieCisSharedCollection).toContain(strategie);
      expect(comp.strategieApasSharedCollection).toContain(strategie);
      expect(comp.strategiePchesSharedCollection).toContain(strategie);
      expect(comp.strategiePchESSharedCollection).toContain(strategie);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NatureActivite>>();
      const natureActivite = { id: 123 };
      jest.spyOn(natureActiviteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ natureActivite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: natureActivite }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(natureActiviteService.update).toHaveBeenCalledWith(natureActivite);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NatureActivite>>();
      const natureActivite = new NatureActivite();
      jest.spyOn(natureActiviteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ natureActivite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: natureActivite }));
      saveSubject.complete();

      // THEN
      expect(natureActiviteService.create).toHaveBeenCalledWith(natureActivite);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NatureActivite>>();
      const natureActivite = { id: 123 };
      jest.spyOn(natureActiviteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ natureActivite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(natureActiviteService.update).toHaveBeenCalledWith(natureActivite);
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
