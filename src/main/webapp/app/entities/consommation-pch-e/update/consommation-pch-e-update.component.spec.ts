jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ConsommationPchEService } from '../service/consommation-pch-e.service';
import { IConsommationPchE, ConsommationPchE } from '../consommation-pch-e.model';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';
import { IStrategiePchE } from 'app/entities/strategie-pch-e/strategie-pch-e.model';
import { StrategiePchEService } from 'app/entities/strategie-pch-e/service/strategie-pch-e.service';

import { ConsommationPchEUpdateComponent } from './consommation-pch-e-update.component';

describe('ConsommationPchE Management Update Component', () => {
  let comp: ConsommationPchEUpdateComponent;
  let fixture: ComponentFixture<ConsommationPchEUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let consommationPchEService: ConsommationPchEService;
  let beneficiaireService: BeneficiaireService;
  let strategiePchEService: StrategiePchEService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ConsommationPchEUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ConsommationPchEUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsommationPchEUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    consommationPchEService = TestBed.inject(ConsommationPchEService);
    beneficiaireService = TestBed.inject(BeneficiaireService);
    strategiePchEService = TestBed.inject(StrategiePchEService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Beneficiaire query and add missing value', () => {
      const consommationPchE: IConsommationPchE = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: 'ae219886-392e-4113-b027-9c80c7f68a1f' };
      consommationPchE.beneficiaire = beneficiaire;

      const beneficiaireCollection: IBeneficiaire[] = [{ id: '925f7bff-8df3-4398-9017-29b7f76924c7' }];
      jest.spyOn(beneficiaireService, 'query').mockReturnValue(of(new HttpResponse({ body: beneficiaireCollection })));
      const additionalBeneficiaires = [beneficiaire];
      const expectedCollection: IBeneficiaire[] = [...additionalBeneficiaires, ...beneficiaireCollection];
      jest.spyOn(beneficiaireService, 'addBeneficiaireToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ consommationPchE });
      comp.ngOnInit();

      expect(beneficiaireService.query).toHaveBeenCalled();
      expect(beneficiaireService.addBeneficiaireToCollectionIfMissing).toHaveBeenCalledWith(
        beneficiaireCollection,
        ...additionalBeneficiaires
      );
      expect(comp.beneficiairesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call StrategiePchE query and add missing value', () => {
      const consommationPchE: IConsommationPchE = { id: 456 };
      const strategiePchE: IStrategiePchE = { id: 74140 };
      consommationPchE.strategiePchE = strategiePchE;

      const strategiePchECollection: IStrategiePchE[] = [{ id: 517 }];
      jest.spyOn(strategiePchEService, 'query').mockReturnValue(of(new HttpResponse({ body: strategiePchECollection })));
      const additionalStrategiePchES = [strategiePchE];
      const expectedCollection: IStrategiePchE[] = [...additionalStrategiePchES, ...strategiePchECollection];
      jest.spyOn(strategiePchEService, 'addStrategiePchEToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ consommationPchE });
      comp.ngOnInit();

      expect(strategiePchEService.query).toHaveBeenCalled();
      expect(strategiePchEService.addStrategiePchEToCollectionIfMissing).toHaveBeenCalledWith(
        strategiePchECollection,
        ...additionalStrategiePchES
      );
      expect(comp.strategiePchESSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const consommationPchE: IConsommationPchE = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: '5274c660-e5f8-49ff-b0b5-b61069b204b6' };
      consommationPchE.beneficiaire = beneficiaire;
      const strategiePchE: IStrategiePchE = { id: 75819 };
      consommationPchE.strategiePchE = strategiePchE;

      activatedRoute.data = of({ consommationPchE });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(consommationPchE));
      expect(comp.beneficiairesSharedCollection).toContain(beneficiaire);
      expect(comp.strategiePchESSharedCollection).toContain(strategiePchE);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConsommationPchE>>();
      const consommationPchE = { id: 123 };
      jest.spyOn(consommationPchEService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consommationPchE });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consommationPchE }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(consommationPchEService.update).toHaveBeenCalledWith(consommationPchE);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConsommationPchE>>();
      const consommationPchE = new ConsommationPchE();
      jest.spyOn(consommationPchEService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consommationPchE });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consommationPchE }));
      saveSubject.complete();

      // THEN
      expect(consommationPchEService.create).toHaveBeenCalledWith(consommationPchE);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConsommationPchE>>();
      const consommationPchE = { id: 123 };
      jest.spyOn(consommationPchEService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consommationPchE });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(consommationPchEService.update).toHaveBeenCalledWith(consommationPchE);
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

    describe('trackStrategiePchEById', () => {
      it('Should return tracked StrategiePchE primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackStrategiePchEById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
