jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { LocalService } from '../service/local.service';
import { ILocal, Local } from '../local.model';
import { IBatiment } from 'app/entities/batiment/batiment.model';
import { BatimentService } from 'app/entities/batiment/service/batiment.service';

import { LocalUpdateComponent } from './local-update.component';

describe('Local Management Update Component', () => {
  let comp: LocalUpdateComponent;
  let fixture: ComponentFixture<LocalUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let localService: LocalService;
  let batimentService: BatimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LocalUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(LocalUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LocalUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    localService = TestBed.inject(LocalService);
    batimentService = TestBed.inject(BatimentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Batiment query and add missing value', () => {
      const local: ILocal = { id: 456 };
      const batiment: IBatiment = { id: 81111 };
      local.batiment = batiment;

      const batimentCollection: IBatiment[] = [{ id: 66279 }];
      jest.spyOn(batimentService, 'query').mockReturnValue(of(new HttpResponse({ body: batimentCollection })));
      const additionalBatiments = [batiment];
      const expectedCollection: IBatiment[] = [...additionalBatiments, ...batimentCollection];
      jest.spyOn(batimentService, 'addBatimentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ local });
      comp.ngOnInit();

      expect(batimentService.query).toHaveBeenCalled();
      expect(batimentService.addBatimentToCollectionIfMissing).toHaveBeenCalledWith(batimentCollection, ...additionalBatiments);
      expect(comp.batimentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const local: ILocal = { id: 456 };
      const batiment: IBatiment = { id: 25680 };
      local.batiment = batiment;

      activatedRoute.data = of({ local });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(local));
      expect(comp.batimentsSharedCollection).toContain(batiment);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Local>>();
      const local = { id: 123 };
      jest.spyOn(localService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ local });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: local }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(localService.update).toHaveBeenCalledWith(local);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Local>>();
      const local = new Local();
      jest.spyOn(localService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ local });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: local }));
      saveSubject.complete();

      // THEN
      expect(localService.create).toHaveBeenCalledWith(local);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Local>>();
      const local = { id: 123 };
      jest.spyOn(localService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ local });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(localService.update).toHaveBeenCalledWith(local);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackBatimentById', () => {
      it('Should return tracked Batiment primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackBatimentById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
