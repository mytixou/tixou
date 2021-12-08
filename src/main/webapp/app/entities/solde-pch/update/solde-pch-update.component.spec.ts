jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SoldePchService } from '../service/solde-pch.service';
import { ISoldePch, SoldePch } from '../solde-pch.model';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';

import { SoldePchUpdateComponent } from './solde-pch-update.component';

describe('SoldePch Management Update Component', () => {
  let comp: SoldePchUpdateComponent;
  let fixture: ComponentFixture<SoldePchUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let soldePchService: SoldePchService;
  let beneficiaireService: BeneficiaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SoldePchUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(SoldePchUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SoldePchUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    soldePchService = TestBed.inject(SoldePchService);
    beneficiaireService = TestBed.inject(BeneficiaireService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Beneficiaire query and add missing value', () => {
      const soldePch: ISoldePch = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: '32be0e0e-b5f7-4851-a324-48a1fab4e81a' };
      soldePch.beneficiaire = beneficiaire;

      const beneficiaireCollection: IBeneficiaire[] = [{ id: '559c37b5-9301-4ee1-9d84-fb98267eb8d5' }];
      jest.spyOn(beneficiaireService, 'query').mockReturnValue(of(new HttpResponse({ body: beneficiaireCollection })));
      const additionalBeneficiaires = [beneficiaire];
      const expectedCollection: IBeneficiaire[] = [...additionalBeneficiaires, ...beneficiaireCollection];
      jest.spyOn(beneficiaireService, 'addBeneficiaireToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ soldePch });
      comp.ngOnInit();

      expect(beneficiaireService.query).toHaveBeenCalled();
      expect(beneficiaireService.addBeneficiaireToCollectionIfMissing).toHaveBeenCalledWith(
        beneficiaireCollection,
        ...additionalBeneficiaires
      );
      expect(comp.beneficiairesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const soldePch: ISoldePch = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: '8cdce26a-e6a8-41ca-a685-f54fb1c24ffc' };
      soldePch.beneficiaire = beneficiaire;

      activatedRoute.data = of({ soldePch });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(soldePch));
      expect(comp.beneficiairesSharedCollection).toContain(beneficiaire);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SoldePch>>();
      const soldePch = { id: 123 };
      jest.spyOn(soldePchService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soldePch });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soldePch }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(soldePchService.update).toHaveBeenCalledWith(soldePch);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SoldePch>>();
      const soldePch = new SoldePch();
      jest.spyOn(soldePchService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soldePch });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soldePch }));
      saveSubject.complete();

      // THEN
      expect(soldePchService.create).toHaveBeenCalledWith(soldePch);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SoldePch>>();
      const soldePch = { id: 123 };
      jest.spyOn(soldePchService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soldePch });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(soldePchService.update).toHaveBeenCalledWith(soldePch);
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
