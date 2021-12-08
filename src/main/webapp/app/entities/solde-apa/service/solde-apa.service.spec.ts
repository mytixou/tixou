import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISoldeApa, SoldeApa } from '../solde-apa.model';

import { SoldeApaService } from './solde-apa.service';

describe('SoldeApa Service', () => {
  let service: SoldeApaService;
  let httpMock: HttpTestingController;
  let elemDefault: ISoldeApa;
  let expectedResult: ISoldeApa | ISoldeApa[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SoldeApaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      annee: 0,
      mois: 0,
      soldeMontantApa: 0,
      soldeHeureApa: 0,
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

    it('should create a SoldeApa', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new SoldeApa()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SoldeApa', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          annee: 1,
          mois: 1,
          soldeMontantApa: 1,
          soldeHeureApa: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SoldeApa', () => {
      const patchObject = Object.assign(
        {
          mois: 1,
          soldeMontantApa: 1,
          soldeHeureApa: 1,
        },
        new SoldeApa()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SoldeApa', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          annee: 1,
          mois: 1,
          soldeMontantApa: 1,
          soldeHeureApa: 1,
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

    it('should delete a SoldeApa', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSoldeApaToCollectionIfMissing', () => {
      it('should add a SoldeApa to an empty array', () => {
        const soldeApa: ISoldeApa = { id: 123 };
        expectedResult = service.addSoldeApaToCollectionIfMissing([], soldeApa);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(soldeApa);
      });

      it('should not add a SoldeApa to an array that contains it', () => {
        const soldeApa: ISoldeApa = { id: 123 };
        const soldeApaCollection: ISoldeApa[] = [
          {
            ...soldeApa,
          },
          { id: 456 },
        ];
        expectedResult = service.addSoldeApaToCollectionIfMissing(soldeApaCollection, soldeApa);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SoldeApa to an array that doesn't contain it", () => {
        const soldeApa: ISoldeApa = { id: 123 };
        const soldeApaCollection: ISoldeApa[] = [{ id: 456 }];
        expectedResult = service.addSoldeApaToCollectionIfMissing(soldeApaCollection, soldeApa);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(soldeApa);
      });

      it('should add only unique SoldeApa to an array', () => {
        const soldeApaArray: ISoldeApa[] = [{ id: 123 }, { id: 456 }, { id: 83369 }];
        const soldeApaCollection: ISoldeApa[] = [{ id: 123 }];
        expectedResult = service.addSoldeApaToCollectionIfMissing(soldeApaCollection, ...soldeApaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const soldeApa: ISoldeApa = { id: 123 };
        const soldeApa2: ISoldeApa = { id: 456 };
        expectedResult = service.addSoldeApaToCollectionIfMissing([], soldeApa, soldeApa2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(soldeApa);
        expect(expectedResult).toContain(soldeApa2);
      });

      it('should accept null and undefined values', () => {
        const soldeApa: ISoldeApa = { id: 123 };
        expectedResult = service.addSoldeApaToCollectionIfMissing([], null, soldeApa, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(soldeApa);
      });

      it('should return initial array if no SoldeApa is added', () => {
        const soldeApaCollection: ISoldeApa[] = [{ id: 123 }];
        expectedResult = service.addSoldeApaToCollectionIfMissing(soldeApaCollection, undefined, null);
        expect(expectedResult).toEqual(soldeApaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
