jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { BatimentService } from '../service/batiment.service';
import { IBatiment, Batiment } from '../batiment.model';
import { ITerrain } from 'app/entities/terrain/terrain.model';
import { TerrainService } from 'app/entities/terrain/service/terrain.service';

import { BatimentUpdateComponent } from './batiment-update.component';

describe('Component Tests', () => {
  describe('Batiment Management Update Component', () => {
    let comp: BatimentUpdateComponent;
    let fixture: ComponentFixture<BatimentUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let batimentService: BatimentService;
    let terrainService: TerrainService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [BatimentUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(BatimentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BatimentUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      batimentService = TestBed.inject(BatimentService);
      terrainService = TestBed.inject(TerrainService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call terrain query and add missing value', () => {
        const batiment: IBatiment = { id: 456 };
        const terrain: ITerrain = { id: 15790 };
        batiment.terrain = terrain;

        const terrainCollection: ITerrain[] = [{ id: 26094 }];
        jest.spyOn(terrainService, 'query').mockReturnValue(of(new HttpResponse({ body: terrainCollection })));
        const expectedCollection: ITerrain[] = [terrain, ...terrainCollection];
        jest.spyOn(terrainService, 'addTerrainToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ batiment });
        comp.ngOnInit();

        expect(terrainService.query).toHaveBeenCalled();
        expect(terrainService.addTerrainToCollectionIfMissing).toHaveBeenCalledWith(terrainCollection, terrain);
        expect(comp.terrainsCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const batiment: IBatiment = { id: 456 };
        const terrain: ITerrain = { id: 12752 };
        batiment.terrain = terrain;

        activatedRoute.data = of({ batiment });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(batiment));
        expect(comp.terrainsCollection).toContain(terrain);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Batiment>>();
        const batiment = { id: 123 };
        jest.spyOn(batimentService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ batiment });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: batiment }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(batimentService.update).toHaveBeenCalledWith(batiment);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Batiment>>();
        const batiment = new Batiment();
        jest.spyOn(batimentService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ batiment });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: batiment }));
        saveSubject.complete();

        // THEN
        expect(batimentService.create).toHaveBeenCalledWith(batiment);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Batiment>>();
        const batiment = { id: 123 };
        jest.spyOn(batimentService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ batiment });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(batimentService.update).toHaveBeenCalledWith(batiment);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackTerrainById', () => {
        it('Should return tracked Terrain primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTerrainById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
