jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ConsommationPchService } from '../service/consommation-pch.service';
import { IConsommationPch, ConsommationPch } from '../consommation-pch.model';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';
import { IStrategiePch } from 'app/entities/strategie-pch/strategie-pch.model';
import { StrategiePchService } from 'app/entities/strategie-pch/service/strategie-pch.service';

import { ConsommationPchUpdateComponent } from './consommation-pch-update.component';

describe('ConsommationPch Management Update Component', () => {
  let comp: ConsommationPchUpdateComponent;
  let fixture: ComponentFixture<ConsommationPchUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let consommationPchService: ConsommationPchService;
  let beneficiaireService: BeneficiaireService;
  let strategiePchService: StrategiePchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ConsommationPchUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ConsommationPchUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsommationPchUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    consommationPchService = TestBed.inject(ConsommationPchService);
    beneficiaireService = TestBed.inject(BeneficiaireService);
    strategiePchService = TestBed.inject(StrategiePchService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Beneficiaire query and add missing value', () => {
      const consommationPch: IConsommationPch = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: '0392f231-60ee-4eaa-8b36-afca4465ca69' };
      consommationPch.beneficiaire = beneficiaire;

      const beneficiaireCollection: IBeneficiaire[] = [{ id: '241d67dd-538b-4a1e-b26d-1fcdb0e5ffba' }];
      jest.spyOn(beneficiaireService, 'query').mockReturnValue(of(new HttpResponse({ body: beneficiaireCollection })));
      const additionalBeneficiaires = [beneficiaire];
      const expectedCollection: IBeneficiaire[] = [...additionalBeneficiaires, ...beneficiaireCollection];
      jest.spyOn(beneficiaireService, 'addBeneficiaireToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ consommationPch });
      comp.ngOnInit();

      expect(beneficiaireService.query).toHaveBeenCalled();
      expect(beneficiaireService.addBeneficiaireToCollectionIfMissing).toHaveBeenCalledWith(
        beneficiaireCollection,
        ...additionalBeneficiaires
      );
      expect(comp.beneficiairesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call StrategiePch query and add missing value', () => {
      const consommationPch: IConsommationPch = { id: 456 };
      const strategiePch: IStrategiePch = { id: 19741 };
      consommationPch.strategiePch = strategiePch;

      const strategiePchCollection: IStrategiePch[] = [{ id: 55256 }];
      jest.spyOn(strategiePchService, 'query').mockReturnValue(of(new HttpResponse({ body: strategiePchCollection })));
      const additionalStrategiePches = [strategiePch];
      const expectedCollection: IStrategiePch[] = [...additionalStrategiePches, ...strategiePchCollection];
      jest.spyOn(strategiePchService, 'addStrategiePchToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ consommationPch });
      comp.ngOnInit();

      expect(strategiePchService.query).toHaveBeenCalled();
      expect(strategiePchService.addStrategiePchToCollectionIfMissing).toHaveBeenCalledWith(
        strategiePchCollection,
        ...additionalStrategiePches
      );
      expect(comp.strategiePchesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const consommationPch: IConsommationPch = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: '0b792984-d209-4e8b-afd3-541b9c853c0b' };
      consommationPch.beneficiaire = beneficiaire;
      const strategiePch: IStrategiePch = { id: 63915 };
      consommationPch.strategiePch = strategiePch;

      activatedRoute.data = of({ consommationPch });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(consommationPch));
      expect(comp.beneficiairesSharedCollection).toContain(beneficiaire);
      expect(comp.strategiePchesSharedCollection).toContain(strategiePch);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConsommationPch>>();
      const consommationPch = { id: 123 };
      jest.spyOn(consommationPchService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consommationPch });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consommationPch }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(consommationPchService.update).toHaveBeenCalledWith(consommationPch);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConsommationPch>>();
      const consommationPch = new ConsommationPch();
      jest.spyOn(consommationPchService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consommationPch });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consommationPch }));
      saveSubject.complete();

      // THEN
      expect(consommationPchService.create).toHaveBeenCalledWith(consommationPch);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConsommationPch>>();
      const consommationPch = { id: 123 };
      jest.spyOn(consommationPchService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consommationPch });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(consommationPchService.update).toHaveBeenCalledWith(consommationPch);
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

    describe('trackStrategiePchById', () => {
      it('Should return tracked StrategiePch primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackStrategiePchById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
