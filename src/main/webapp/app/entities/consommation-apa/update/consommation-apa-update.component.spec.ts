jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ConsommationApaService } from '../service/consommation-apa.service';
import { IConsommationApa, ConsommationApa } from '../consommation-apa.model';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';
import { IStrategieApa } from 'app/entities/strategie-apa/strategie-apa.model';
import { StrategieApaService } from 'app/entities/strategie-apa/service/strategie-apa.service';

import { ConsommationApaUpdateComponent } from './consommation-apa-update.component';

describe('ConsommationApa Management Update Component', () => {
  let comp: ConsommationApaUpdateComponent;
  let fixture: ComponentFixture<ConsommationApaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let consommationApaService: ConsommationApaService;
  let beneficiaireService: BeneficiaireService;
  let strategieApaService: StrategieApaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ConsommationApaUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ConsommationApaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsommationApaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    consommationApaService = TestBed.inject(ConsommationApaService);
    beneficiaireService = TestBed.inject(BeneficiaireService);
    strategieApaService = TestBed.inject(StrategieApaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Beneficiaire query and add missing value', () => {
      const consommationApa: IConsommationApa = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: 'c28e51ac-0e9d-4b43-90c5-731997ca486c' };
      consommationApa.beneficiaire = beneficiaire;

      const beneficiaireCollection: IBeneficiaire[] = [{ id: '54153aa0-3fe9-451d-ad20-6d0f4e960613' }];
      jest.spyOn(beneficiaireService, 'query').mockReturnValue(of(new HttpResponse({ body: beneficiaireCollection })));
      const additionalBeneficiaires = [beneficiaire];
      const expectedCollection: IBeneficiaire[] = [...additionalBeneficiaires, ...beneficiaireCollection];
      jest.spyOn(beneficiaireService, 'addBeneficiaireToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ consommationApa });
      comp.ngOnInit();

      expect(beneficiaireService.query).toHaveBeenCalled();
      expect(beneficiaireService.addBeneficiaireToCollectionIfMissing).toHaveBeenCalledWith(
        beneficiaireCollection,
        ...additionalBeneficiaires
      );
      expect(comp.beneficiairesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call StrategieApa query and add missing value', () => {
      const consommationApa: IConsommationApa = { id: 456 };
      const strategieApa: IStrategieApa = { id: 98794 };
      consommationApa.strategieApa = strategieApa;

      const strategieApaCollection: IStrategieApa[] = [{ id: 27714 }];
      jest.spyOn(strategieApaService, 'query').mockReturnValue(of(new HttpResponse({ body: strategieApaCollection })));
      const additionalStrategieApas = [strategieApa];
      const expectedCollection: IStrategieApa[] = [...additionalStrategieApas, ...strategieApaCollection];
      jest.spyOn(strategieApaService, 'addStrategieApaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ consommationApa });
      comp.ngOnInit();

      expect(strategieApaService.query).toHaveBeenCalled();
      expect(strategieApaService.addStrategieApaToCollectionIfMissing).toHaveBeenCalledWith(
        strategieApaCollection,
        ...additionalStrategieApas
      );
      expect(comp.strategieApasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const consommationApa: IConsommationApa = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: 'f58d055f-6479-490c-8ce3-4f3a4f67ca2c' };
      consommationApa.beneficiaire = beneficiaire;
      const strategieApa: IStrategieApa = { id: 48658 };
      consommationApa.strategieApa = strategieApa;

      activatedRoute.data = of({ consommationApa });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(consommationApa));
      expect(comp.beneficiairesSharedCollection).toContain(beneficiaire);
      expect(comp.strategieApasSharedCollection).toContain(strategieApa);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConsommationApa>>();
      const consommationApa = { id: 123 };
      jest.spyOn(consommationApaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consommationApa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consommationApa }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(consommationApaService.update).toHaveBeenCalledWith(consommationApa);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConsommationApa>>();
      const consommationApa = new ConsommationApa();
      jest.spyOn(consommationApaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consommationApa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consommationApa }));
      saveSubject.complete();

      // THEN
      expect(consommationApaService.create).toHaveBeenCalledWith(consommationApa);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConsommationApa>>();
      const consommationApa = { id: 123 };
      jest.spyOn(consommationApaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consommationApa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(consommationApaService.update).toHaveBeenCalledWith(consommationApa);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackBeneficiaireById', () => {
      it('Should return tracked Beneficiaire primary key', () => {
        const entity = { id: 'ABC' };
        const trackResult = comp.trackBeneficiaireById(0, entity);
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
  });
});
