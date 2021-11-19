jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { RefContrainteService } from '../service/ref-contrainte.service';
import { IRefContrainte, RefContrainte } from '../ref-contrainte.model';

import { RefContrainteUpdateComponent } from './ref-contrainte-update.component';

describe('Component Tests', () => {
  describe('RefContrainte Management Update Component', () => {
    let comp: RefContrainteUpdateComponent;
    let fixture: ComponentFixture<RefContrainteUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let refContrainteService: RefContrainteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [RefContrainteUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(RefContrainteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefContrainteUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      refContrainteService = TestBed.inject(RefContrainteService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const refContrainte: IRefContrainte = { id: 456 };

        activatedRoute.data = of({ refContrainte });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(refContrainte));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<RefContrainte>>();
        const refContrainte = { id: 123 };
        jest.spyOn(refContrainteService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ refContrainte });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: refContrainte }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(refContrainteService.update).toHaveBeenCalledWith(refContrainte);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<RefContrainte>>();
        const refContrainte = new RefContrainte();
        jest.spyOn(refContrainteService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ refContrainte });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: refContrainte }));
        saveSubject.complete();

        // THEN
        expect(refContrainteService.create).toHaveBeenCalledWith(refContrainte);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<RefContrainte>>();
        const refContrainte = { id: 123 };
        jest.spyOn(refContrainteService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ refContrainte });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(refContrainteService.update).toHaveBeenCalledWith(refContrainte);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
