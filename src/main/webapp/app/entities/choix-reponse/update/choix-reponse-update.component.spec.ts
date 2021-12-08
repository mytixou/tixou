jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ChoixReponseService } from '../service/choix-reponse.service';
import { IChoixReponse, ChoixReponse } from '../choix-reponse.model';
import { IDossier } from 'app/entities/dossier/dossier.model';
import { DossierService } from 'app/entities/dossier/service/dossier.service';
import { IReponse } from 'app/entities/reponse/reponse.model';
import { ReponseService } from 'app/entities/reponse/service/reponse.service';

import { ChoixReponseUpdateComponent } from './choix-reponse-update.component';

describe('ChoixReponse Management Update Component', () => {
  let comp: ChoixReponseUpdateComponent;
  let fixture: ComponentFixture<ChoixReponseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let choixReponseService: ChoixReponseService;
  let dossierService: DossierService;
  let reponseService: ReponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChoixReponseUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ChoixReponseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChoixReponseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    choixReponseService = TestBed.inject(ChoixReponseService);
    dossierService = TestBed.inject(DossierService);
    reponseService = TestBed.inject(ReponseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Dossier query and add missing value', () => {
      const choixReponse: IChoixReponse = { id: 456 };
      const dossier: IDossier = { id: 15675 };
      choixReponse.dossier = dossier;

      const dossierCollection: IDossier[] = [{ id: 56 }];
      jest.spyOn(dossierService, 'query').mockReturnValue(of(new HttpResponse({ body: dossierCollection })));
      const additionalDossiers = [dossier];
      const expectedCollection: IDossier[] = [...additionalDossiers, ...dossierCollection];
      jest.spyOn(dossierService, 'addDossierToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ choixReponse });
      comp.ngOnInit();

      expect(dossierService.query).toHaveBeenCalled();
      expect(dossierService.addDossierToCollectionIfMissing).toHaveBeenCalledWith(dossierCollection, ...additionalDossiers);
      expect(comp.dossiersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Reponse query and add missing value', () => {
      const choixReponse: IChoixReponse = { id: 456 };
      const reponse: IReponse = { id: 43124 };
      choixReponse.reponse = reponse;

      const reponseCollection: IReponse[] = [{ id: 78142 }];
      jest.spyOn(reponseService, 'query').mockReturnValue(of(new HttpResponse({ body: reponseCollection })));
      const additionalReponses = [reponse];
      const expectedCollection: IReponse[] = [...additionalReponses, ...reponseCollection];
      jest.spyOn(reponseService, 'addReponseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ choixReponse });
      comp.ngOnInit();

      expect(reponseService.query).toHaveBeenCalled();
      expect(reponseService.addReponseToCollectionIfMissing).toHaveBeenCalledWith(reponseCollection, ...additionalReponses);
      expect(comp.reponsesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const choixReponse: IChoixReponse = { id: 456 };
      const dossier: IDossier = { id: 31872 };
      choixReponse.dossier = dossier;
      const reponse: IReponse = { id: 91501 };
      choixReponse.reponse = reponse;

      activatedRoute.data = of({ choixReponse });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(choixReponse));
      expect(comp.dossiersSharedCollection).toContain(dossier);
      expect(comp.reponsesSharedCollection).toContain(reponse);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ChoixReponse>>();
      const choixReponse = { id: 123 };
      jest.spyOn(choixReponseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ choixReponse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: choixReponse }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(choixReponseService.update).toHaveBeenCalledWith(choixReponse);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ChoixReponse>>();
      const choixReponse = new ChoixReponse();
      jest.spyOn(choixReponseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ choixReponse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: choixReponse }));
      saveSubject.complete();

      // THEN
      expect(choixReponseService.create).toHaveBeenCalledWith(choixReponse);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ChoixReponse>>();
      const choixReponse = { id: 123 };
      jest.spyOn(choixReponseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ choixReponse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(choixReponseService.update).toHaveBeenCalledWith(choixReponse);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackDossierById', () => {
      it('Should return tracked Dossier primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDossierById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackReponseById', () => {
      it('Should return tracked Reponse primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackReponseById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
