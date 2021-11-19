jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DossierService } from '../service/dossier.service';
import { IDossier, Dossier } from '../dossier.model';
import { ICommanditaire } from 'app/entities/commanditaire/commanditaire.model';
import { CommanditaireService } from 'app/entities/commanditaire/service/commanditaire.service';

import { DossierUpdateComponent } from './dossier-update.component';

describe('Component Tests', () => {
  describe('Dossier Management Update Component', () => {
    let comp: DossierUpdateComponent;
    let fixture: ComponentFixture<DossierUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let dossierService: DossierService;
    let commanditaireService: CommanditaireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DossierUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DossierUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DossierUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      dossierService = TestBed.inject(DossierService);
      commanditaireService = TestBed.inject(CommanditaireService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Commanditaire query and add missing value', () => {
        const dossier: IDossier = { id: 456 };
        const commanditaire: ICommanditaire = { id: 98208 };
        dossier.commanditaire = commanditaire;

        const commanditaireCollection: ICommanditaire[] = [{ id: 10564 }];
        jest.spyOn(commanditaireService, 'query').mockReturnValue(of(new HttpResponse({ body: commanditaireCollection })));
        const additionalCommanditaires = [commanditaire];
        const expectedCollection: ICommanditaire[] = [...additionalCommanditaires, ...commanditaireCollection];
        jest.spyOn(commanditaireService, 'addCommanditaireToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ dossier });
        comp.ngOnInit();

        expect(commanditaireService.query).toHaveBeenCalled();
        expect(commanditaireService.addCommanditaireToCollectionIfMissing).toHaveBeenCalledWith(
          commanditaireCollection,
          ...additionalCommanditaires
        );
        expect(comp.commanditairesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const dossier: IDossier = { id: 456 };
        const commanditaire: ICommanditaire = { id: 5829 };
        dossier.commanditaire = commanditaire;

        activatedRoute.data = of({ dossier });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(dossier));
        expect(comp.commanditairesSharedCollection).toContain(commanditaire);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Dossier>>();
        const dossier = { id: 123 };
        jest.spyOn(dossierService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ dossier });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: dossier }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(dossierService.update).toHaveBeenCalledWith(dossier);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Dossier>>();
        const dossier = new Dossier();
        jest.spyOn(dossierService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ dossier });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: dossier }));
        saveSubject.complete();

        // THEN
        expect(dossierService.create).toHaveBeenCalledWith(dossier);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Dossier>>();
        const dossier = { id: 123 };
        jest.spyOn(dossierService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ dossier });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(dossierService.update).toHaveBeenCalledWith(dossier);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackCommanditaireById', () => {
        it('Should return tracked Commanditaire primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCommanditaireById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
