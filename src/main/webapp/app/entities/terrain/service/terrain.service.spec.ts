import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITerrain, Terrain } from '../terrain.model';

import { TerrainService } from './terrain.service';

describe('Terrain Service', () => {
  let service: TerrainService;
  let httpMock: HttpTestingController;
  let elemDefault: ITerrain;
  let expectedResult: ITerrain | ITerrain[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TerrainService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      parcelle: 'AAAAAAA',
      surface: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Terrain', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Terrain()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Terrain', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          parcelle: 'BBBBBB',
          surface: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Terrain', () => {
      const patchObject = Object.assign(
        {
          parcelle: 'BBBBBB',
          surface: 1,
        },
        new Terrain()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Terrain', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          parcelle: 'BBBBBB',
          surface: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Terrain', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTerrainToCollectionIfMissing', () => {
      it('should add a Terrain to an empty array', () => {
        const terrain: ITerrain = { id: 123 };
        expectedResult = service.addTerrainToCollectionIfMissing([], terrain);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(terrain);
      });

      it('should not add a Terrain to an array that contains it', () => {
        const terrain: ITerrain = { id: 123 };
        const terrainCollection: ITerrain[] = [
          {
            ...terrain,
          },
          { id: 456 },
        ];
        expectedResult = service.addTerrainToCollectionIfMissing(terrainCollection, terrain);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Terrain to an array that doesn't contain it", () => {
        const terrain: ITerrain = { id: 123 };
        const terrainCollection: ITerrain[] = [{ id: 456 }];
        expectedResult = service.addTerrainToCollectionIfMissing(terrainCollection, terrain);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(terrain);
      });

      it('should add only unique Terrain to an array', () => {
        const terrainArray: ITerrain[] = [{ id: 123 }, { id: 456 }, { id: 45834 }];
        const terrainCollection: ITerrain[] = [{ id: 123 }];
        expectedResult = service.addTerrainToCollectionIfMissing(terrainCollection, ...terrainArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const terrain: ITerrain = { id: 123 };
        const terrain2: ITerrain = { id: 456 };
        expectedResult = service.addTerrainToCollectionIfMissing([], terrain, terrain2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(terrain);
        expect(expectedResult).toContain(terrain2);
      });

      it('should accept null and undefined values', () => {
        const terrain: ITerrain = { id: 123 };
        expectedResult = service.addTerrainToCollectionIfMissing([], null, terrain, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(terrain);
      });

      it('should return initial array if no Terrain is added', () => {
        const terrainCollection: ITerrain[] = [{ id: 123 }];
        expectedResult = service.addTerrainToCollectionIfMissing(terrainCollection, undefined, null);
        expect(expectedResult).toEqual(terrainCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
