jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ProprietaireService } from '../service/proprietaire.service';
import { IProprietaire, Proprietaire } from '../proprietaire.model';
import { ILocal } from 'app/entities/local/local.model';
import { LocalService } from 'app/entities/local/service/local.service';

import { ProprietaireUpdateComponent } from './proprietaire-update.component';

describe('Proprietaire Management Update Component', () => {
  let comp: ProprietaireUpdateComponent;
  let fixture: ComponentFixture<ProprietaireUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let proprietaireService: ProprietaireService;
  let localService: LocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProprietaireUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ProprietaireUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProprietaireUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    proprietaireService = TestBed.inject(ProprietaireService);
    localService = TestBed.inject(LocalService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Local query and add missing value', () => {
      const proprietaire: IProprietaire = { id: 456 };
      const locals: ILocal[] = [{ id: 46148 }];
      proprietaire.locals = locals;

      const localCollection: ILocal[] = [{ id: 16967 }];
      jest.spyOn(localService, 'query').mockReturnValue(of(new HttpResponse({ body: localCollection })));
      const additionalLocals = [...locals];
      const expectedCollection: ILocal[] = [...additionalLocals, ...localCollection];
      jest.spyOn(localService, 'addLocalToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ proprietaire });
      comp.ngOnInit();

      expect(localService.query).toHaveBeenCalled();
      expect(localService.addLocalToCollectionIfMissing).toHaveBeenCalledWith(localCollection, ...additionalLocals);
      expect(comp.localsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const proprietaire: IProprietaire = { id: 456 };
      const locals: ILocal = { id: 2001 };
      proprietaire.locals = [locals];

      activatedRoute.data = of({ proprietaire });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(proprietaire));
      expect(comp.localsSharedCollection).toContain(locals);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Proprietaire>>();
      const proprietaire = { id: 123 };
      jest.spyOn(proprietaireService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ proprietaire });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: proprietaire }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(proprietaireService.update).toHaveBeenCalledWith(proprietaire);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Proprietaire>>();
      const proprietaire = new Proprietaire();
      jest.spyOn(proprietaireService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ proprietaire });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: proprietaire }));
      saveSubject.complete();

      // THEN
      expect(proprietaireService.create).toHaveBeenCalledWith(proprietaire);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Proprietaire>>();
      const proprietaire = { id: 123 };
      jest.spyOn(proprietaireService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ proprietaire });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(proprietaireService.update).toHaveBeenCalledWith(proprietaire);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackLocalById', () => {
      it('Should return tracked Local primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackLocalById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedLocal', () => {
      it('Should return option if no Local is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedLocal(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Local for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedLocal(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Local is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedLocal(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
