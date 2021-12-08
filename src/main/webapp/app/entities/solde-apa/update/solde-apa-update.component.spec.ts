jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SoldeApaService } from '../service/solde-apa.service';
import { ISoldeApa, SoldeApa } from '../solde-apa.model';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { BeneficiaireService } from 'app/entities/beneficiaire/service/beneficiaire.service';

import { SoldeApaUpdateComponent } from './solde-apa-update.component';

describe('SoldeApa Management Update Component', () => {
  let comp: SoldeApaUpdateComponent;
  let fixture: ComponentFixture<SoldeApaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let soldeApaService: SoldeApaService;
  let beneficiaireService: BeneficiaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SoldeApaUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(SoldeApaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SoldeApaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    soldeApaService = TestBed.inject(SoldeApaService);
    beneficiaireService = TestBed.inject(BeneficiaireService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Beneficiaire query and add missing value', () => {
      const soldeApa: ISoldeApa = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: '5bd9d09c-c7d4-43f4-8900-b777d53af91f' };
      soldeApa.beneficiaire = beneficiaire;

      const beneficiaireCollection: IBeneficiaire[] = [{ id: 'd9ff16bc-dfe8-4909-8c5b-70404300f0e3' }];
      jest.spyOn(beneficiaireService, 'query').mockReturnValue(of(new HttpResponse({ body: beneficiaireCollection })));
      const additionalBeneficiaires = [beneficiaire];
      const expectedCollection: IBeneficiaire[] = [...additionalBeneficiaires, ...beneficiaireCollection];
      jest.spyOn(beneficiaireService, 'addBeneficiaireToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ soldeApa });
      comp.ngOnInit();

      expect(beneficiaireService.query).toHaveBeenCalled();
      expect(beneficiaireService.addBeneficiaireToCollectionIfMissing).toHaveBeenCalledWith(
        beneficiaireCollection,
        ...additionalBeneficiaires
      );
      expect(comp.beneficiairesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const soldeApa: ISoldeApa = { id: 456 };
      const beneficiaire: IBeneficiaire = { id: 'ca01e1fa-0f65-4295-913f-d86e04fe2a78' };
      soldeApa.beneficiaire = beneficiaire;

      activatedRoute.data = of({ soldeApa });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(soldeApa));
      expect(comp.beneficiairesSharedCollection).toContain(beneficiaire);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SoldeApa>>();
      const soldeApa = { id: 123 };
      jest.spyOn(soldeApaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soldeApa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soldeApa }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(soldeApaService.update).toHaveBeenCalledWith(soldeApa);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SoldeApa>>();
      const soldeApa = new SoldeApa();
      jest.spyOn(soldeApaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soldeApa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soldeApa }));
      saveSubject.complete();

      // THEN
      expect(soldeApaService.create).toHaveBeenCalledWith(soldeApa);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SoldeApa>>();
      const soldeApa = { id: 123 };
      jest.spyOn(soldeApaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soldeApa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(soldeApaService.update).toHaveBeenCalledWith(soldeApa);
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
