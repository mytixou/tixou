jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SoldePchEService } from '../service/solde-pch-e.service';
import { ISoldePchE, SoldePchE } from '../solde-pch-e.model';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';

import { SoldePchEUpdateComponent } from './solde-pch-e-update.component';

describe('SoldePchE Management Update Component', () => {
  let comp: SoldePchEUpdateComponent;
  let fixture: ComponentFixture<SoldePchEUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let soldePchEService: SoldePchEService;
  let beneficiaireService: BeneficiaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SoldePchEUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(SoldePchEUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SoldePchEUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    soldePchEService = TestBed.inject(SoldePchEService);
    beneficiaireService = TestBed.inject(BeneficiaireService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Beneficiaire query and add missing value', () => {
      const soldePchE: ISoldePchE = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: '48645e03-7177-46e4-a7a6-dceb6b24d57b' };
      soldePchE.beneficiaire = beneficiaire;

      const beneficiaireCollection: IBeneficiaire[] = [{ id: '28cda4b9-ef0e-4c21-bbb8-524a6396c0f8' }];
      jest.spyOn(beneficiaireService, 'query').mockReturnValue(of(new HttpResponse({ body: beneficiaireCollection })));
      const additionalBeneficiaires = [beneficiaire];
      const expectedCollection: IBeneficiaire[] = [...additionalBeneficiaires, ...beneficiaireCollection];
      jest.spyOn(beneficiaireService, 'addBeneficiaireToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ soldePchE });
      comp.ngOnInit();

      expect(beneficiaireService.query).toHaveBeenCalled();
      expect(beneficiaireService.addBeneficiaireToCollectionIfMissing).toHaveBeenCalledWith(
        beneficiaireCollection,
        ...additionalBeneficiaires
      );
      expect(comp.beneficiairesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const soldePchE: ISoldePchE = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: '170af3cf-5138-4d5f-a51c-c06c50d77201' };
      soldePchE.beneficiaire = beneficiaire;

      activatedRoute.data = of({ soldePchE });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(soldePchE));
      expect(comp.beneficiairesSharedCollection).toContain(beneficiaire);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SoldePchE>>();
      const soldePchE = { id: 123 };
      jest.spyOn(soldePchEService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soldePchE });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soldePchE }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(soldePchEService.update).toHaveBeenCalledWith(soldePchE);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SoldePchE>>();
      const soldePchE = new SoldePchE();
      jest.spyOn(soldePchEService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soldePchE });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soldePchE }));
      saveSubject.complete();

      // THEN
      expect(soldePchEService.create).toHaveBeenCalledWith(soldePchE);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SoldePchE>>();
      const soldePchE = { id: 123 };
      jest.spyOn(soldePchEService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soldePchE });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(soldePchEService.update).toHaveBeenCalledWith(soldePchE);
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
  });
});
