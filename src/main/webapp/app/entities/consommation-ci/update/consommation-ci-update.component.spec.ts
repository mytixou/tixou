jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ConsommationCiService } from '../service/consommation-ci.service';
import { IConsommationCi, ConsommationCi } from '../consommation-ci.model';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';
import { IStrategieCi } from 'app/entities/strategie-ci/strategie-ci.model';
import { StrategieCiService } from 'app/entities/strategie-ci/service/strategie-ci.service';

import { ConsommationCiUpdateComponent } from './consommation-ci-update.component';

describe('ConsommationCi Management Update Component', () => {
  let comp: ConsommationCiUpdateComponent;
  let fixture: ComponentFixture<ConsommationCiUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let consommationCiService: ConsommationCiService;
  let beneficiaireService: BeneficiaireService;
  let strategieCiService: StrategieCiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ConsommationCiUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ConsommationCiUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsommationCiUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    consommationCiService = TestBed.inject(ConsommationCiService);
    beneficiaireService = TestBed.inject(BeneficiaireService);
    strategieCiService = TestBed.inject(StrategieCiService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Beneficiaire query and add missing value', () => {
      const consommationCi: IConsommationCi = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: '69457fd1-78c1-49cd-b13f-38895d42babc' };
      consommationCi.beneficiaire = beneficiaire;

      const beneficiaireCollection: IBeneficiaire[] = [{ id: '7feb03a0-1e0d-42e6-a09e-b1907c66a3c5' }];
      jest.spyOn(beneficiaireService, 'query').mockReturnValue(of(new HttpResponse({ body: beneficiaireCollection })));
      const additionalBeneficiaires = [beneficiaire];
      const expectedCollection: IBeneficiaire[] = [...additionalBeneficiaires, ...beneficiaireCollection];
      jest.spyOn(beneficiaireService, 'addBeneficiaireToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ consommationCi });
      comp.ngOnInit();

      expect(beneficiaireService.query).toHaveBeenCalled();
      expect(beneficiaireService.addBeneficiaireToCollectionIfMissing).toHaveBeenCalledWith(
        beneficiaireCollection,
        ...additionalBeneficiaires
      );
      expect(comp.beneficiairesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call StrategieCi query and add missing value', () => {
      const consommationCi: IConsommationCi = { id: 456 };
      const strategieCi: IStrategieCi = { id: 85711 };
      consommationCi.strategieCi = strategieCi;

      const strategieCiCollection: IStrategieCi[] = [{ id: 51224 }];
      jest.spyOn(strategieCiService, 'query').mockReturnValue(of(new HttpResponse({ body: strategieCiCollection })));
      const additionalStrategieCis = [strategieCi];
      const expectedCollection: IStrategieCi[] = [...additionalStrategieCis, ...strategieCiCollection];
      jest.spyOn(strategieCiService, 'addStrategieCiToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ consommationCi });
      comp.ngOnInit();

      expect(strategieCiService.query).toHaveBeenCalled();
      expect(strategieCiService.addStrategieCiToCollectionIfMissing).toHaveBeenCalledWith(strategieCiCollection, ...additionalStrategieCis);
      expect(comp.strategieCisSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const consommationCi: IConsommationCi = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: '38bc8aa2-3d51-406c-aba6-7155e450c4c2' };
      consommationCi.beneficiaire = beneficiaire;
      const strategieCi: IStrategieCi = { id: 55247 };
      consommationCi.strategieCi = strategieCi;

      activatedRoute.data = of({ consommationCi });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(consommationCi));
      expect(comp.beneficiairesSharedCollection).toContain(beneficiaire);
      expect(comp.strategieCisSharedCollection).toContain(strategieCi);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConsommationCi>>();
      const consommationCi = { id: 123 };
      jest.spyOn(consommationCiService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consommationCi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consommationCi }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(consommationCiService.update).toHaveBeenCalledWith(consommationCi);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConsommationCi>>();
      const consommationCi = new ConsommationCi();
      jest.spyOn(consommationCiService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consommationCi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consommationCi }));
      saveSubject.complete();

      // THEN
      expect(consommationCiService.create).toHaveBeenCalledWith(consommationCi);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConsommationCi>>();
      const consommationCi = { id: 123 };
      jest.spyOn(consommationCiService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consommationCi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(consommationCiService.update).toHaveBeenCalledWith(consommationCi);
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

    describe('trackStrategieCiById', () => {
      it('Should return tracked StrategieCi primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackStrategieCiById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
