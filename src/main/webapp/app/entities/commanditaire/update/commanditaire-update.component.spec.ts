jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CommanditaireService } from '../service/commanditaire.service';
import { ICommanditaire, Commanditaire } from '../commanditaire.model';

import { CommanditaireUpdateComponent } from './commanditaire-update.component';

describe('Component Tests', () => {
  describe('Commanditaire Management Update Component', () => {
    let comp: CommanditaireUpdateComponent;
    let fixture: ComponentFixture<CommanditaireUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let commanditaireService: CommanditaireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CommanditaireUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CommanditaireUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommanditaireUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      commanditaireService = TestBed.inject(CommanditaireService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const commanditaire: ICommanditaire = { id: 456 };

        activatedRoute.data = of({ commanditaire });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(commanditaire));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Commanditaire>>();
        const commanditaire = { id: 123 };
        jest.spyOn(commanditaireService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ commanditaire });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: commanditaire }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(commanditaireService.update).toHaveBeenCalledWith(commanditaire);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Commanditaire>>();
        const commanditaire = new Commanditaire();
        jest.spyOn(commanditaireService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ commanditaire });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: commanditaire }));
        saveSubject.complete();

        // THEN
        expect(commanditaireService.create).toHaveBeenCalledWith(commanditaire);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Commanditaire>>();
        const commanditaire = { id: 123 };
        jest.spyOn(commanditaireService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ commanditaire });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(commanditaireService.update).toHaveBeenCalledWith(commanditaire);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
