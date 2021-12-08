jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SoldeCiService } from '../service/solde-ci.service';
import { ISoldeCi, SoldeCi } from '../solde-ci.model';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';

import { SoldeCiUpdateComponent } from './solde-ci-update.component';

describe('SoldeCi Management Update Component', () => {
  let comp: SoldeCiUpdateComponent;
  let fixture: ComponentFixture<SoldeCiUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let soldeCiService: SoldeCiService;
  let beneficiaireService: BeneficiaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SoldeCiUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(SoldeCiUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SoldeCiUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    soldeCiService = TestBed.inject(SoldeCiService);
    beneficiaireService = TestBed.inject(BeneficiaireService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Beneficiaire query and add missing value', () => {
      const soldeCi: ISoldeCi = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: 'b9612db2-4404-4691-8c16-d25481c2a8c6' };
      soldeCi.beneficiaire = beneficiaire;

      const beneficiaireCollection: IBeneficiaire[] = [{ id: '4a2bd021-210d-4d3e-baff-971c469c37cb' }];
      jest.spyOn(beneficiaireService, 'query').mockReturnValue(of(new HttpResponse({ body: beneficiaireCollection })));
      const additionalBeneficiaires = [beneficiaire];
      const expectedCollection: IBeneficiaire[] = [...additionalBeneficiaires, ...beneficiaireCollection];
      jest.spyOn(beneficiaireService, 'addBeneficiaireToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ soldeCi });
      comp.ngOnInit();

      expect(beneficiaireService.query).toHaveBeenCalled();
      expect(beneficiaireService.addBeneficiaireToCollectionIfMissing).toHaveBeenCalledWith(
        beneficiaireCollection,
        ...additionalBeneficiaires
      );
      expect(comp.beneficiairesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const soldeCi: ISoldeCi = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: '8f036b86-d984-444e-bfb4-8366a5a006e2' };
      soldeCi.beneficiaire = beneficiaire;

      activatedRoute.data = of({ soldeCi });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(soldeCi));
      expect(comp.beneficiairesSharedCollection).toContain(beneficiaire);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SoldeCi>>();
      const soldeCi = { id: 123 };
      jest.spyOn(soldeCiService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soldeCi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soldeCi }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(soldeCiService.update).toHaveBeenCalledWith(soldeCi);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SoldeCi>>();
      const soldeCi = new SoldeCi();
      jest.spyOn(soldeCiService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soldeCi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soldeCi }));
      saveSubject.complete();

      // THEN
      expect(soldeCiService.create).toHaveBeenCalledWith(soldeCi);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SoldeCi>>();
      const soldeCi = { id: 123 };
      jest.spyOn(soldeCiService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soldeCi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(soldeCiService.update).toHaveBeenCalledWith(soldeCi);
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
