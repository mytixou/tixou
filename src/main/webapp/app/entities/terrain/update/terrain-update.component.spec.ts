jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TerrainService } from '../service/terrain.service';
import { ITerrain, Terrain } from '../terrain.model';
import { IAdresse } from 'app/entities/adresse/adresse.model';
import { AdresseService } from 'app/entities/adresse/service/adresse.service';

import { TerrainUpdateComponent } from './terrain-update.component';

describe('Component Tests', () => {
  describe('Terrain Management Update Component', () => {
    let comp: TerrainUpdateComponent;
    let fixture: ComponentFixture<TerrainUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let terrainService: TerrainService;
    let adresseService: AdresseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TerrainUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TerrainUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TerrainUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      terrainService = TestBed.inject(TerrainService);
      adresseService = TestBed.inject(AdresseService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Adresse query and add missing value', () => {
        const terrain: ITerrain = { id: 456 };
        const adresse: IAdresse = { id: 39778 };
        terrain.adresse = adresse;

        const adresseCollection: IAdresse[] = [{ id: 53886 }];
        jest.spyOn(adresseService, 'query').mockReturnValue(of(new HttpResponse({ body: adresseCollection })));
        const additionalAdresses = [adresse];
        const expectedCollection: IAdresse[] = [...additionalAdresses, ...adresseCollection];
        jest.spyOn(adresseService, 'addAdresseToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ terrain });
        comp.ngOnInit();

        expect(adresseService.query).toHaveBeenCalled();
        expect(adresseService.addAdresseToCollectionIfMissing).toHaveBeenCalledWith(adresseCollection, ...additionalAdresses);
        expect(comp.adressesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const terrain: ITerrain = { id: 456 };
        const adresse: IAdresse = { id: 79320 };
        terrain.adresse = adresse;

        activatedRoute.data = of({ terrain });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(terrain));
        expect(comp.adressesSharedCollection).toContain(adresse);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Terrain>>();
        const terrain = { id: 123 };
        jest.spyOn(terrainService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ terrain });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: terrain }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(terrainService.update).toHaveBeenCalledWith(terrain);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Terrain>>();
        const terrain = new Terrain();
        jest.spyOn(terrainService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ terrain });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: terrain }));
        saveSubject.complete();

        // THEN
        expect(terrainService.create).toHaveBeenCalledWith(terrain);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Terrain>>();
        const terrain = { id: 123 };
        jest.spyOn(terrainService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ terrain });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(terrainService.update).toHaveBeenCalledWith(terrain);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackAdresseById', () => {
        it('Should return tracked Adresse primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackAdresseById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
