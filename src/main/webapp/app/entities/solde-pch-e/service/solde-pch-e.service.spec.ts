import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISoldePchE, SoldePchE } from '../solde-pch-e.model';

import { SoldePchEService } from './solde-pch-e.service';

describe('SoldePchE Service', () => {
  let service: SoldePchEService;
  let httpMock: HttpTestingController;
  let elemDefault: ISoldePchE;
  let expectedResult: ISoldePchE | ISoldePchE[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SoldePchEService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      annee: 0,
      mois: 0,
      soldeMontantPchE: 0,
      soldeHeurePchE: 0,
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

    it('should create a SoldePchE', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new SoldePchE()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SoldePchE', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          annee: 1,
          mois: 1,
          soldeMontantPchE: 1,
          soldeHeurePchE: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SoldePchE', () => {
      const patchObject = Object.assign(
        {
          mois: 1,
          soldeMontantPchE: 1,
          soldeHeurePchE: 1,
        },
        new SoldePchE()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SoldePchE', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          annee: 1,
          mois: 1,
          soldeMontantPchE: 1,
          soldeHeurePchE: 1,
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

    it('should delete a SoldePchE', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSoldePchEToCollectionIfMissing', () => {
      it('should add a SoldePchE to an empty array', () => {
        const soldePchE: ISoldePchE = { id: 123 };
        expectedResult = service.addSoldePchEToCollectionIfMissing([], soldePchE);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(soldePchE);
      });

      it('should not add a SoldePchE to an array that contains it', () => {
        const soldePchE: ISoldePchE = { id: 123 };
        const soldePchECollection: ISoldePchE[] = [
          {
            ...soldePchE,
          },
          { id: 456 },
        ];
        expectedResult = service.addSoldePchEToCollectionIfMissing(soldePchECollection, soldePchE);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SoldePchE to an array that doesn't contain it", () => {
        const soldePchE: ISoldePchE = { id: 123 };
        const soldePchECollection: ISoldePchE[] = [{ id: 456 }];
        expectedResult = service.addSoldePchEToCollectionIfMissing(soldePchECollection, soldePchE);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(soldePchE);
      });

      it('should add only unique SoldePchE to an array', () => {
        const soldePchEArray: ISoldePchE[] = [{ id: 123 }, { id: 456 }, { id: 25320 }];
        const soldePchECollection: ISoldePchE[] = [{ id: 123 }];
        expectedResult = service.addSoldePchEToCollectionIfMissing(soldePchECollection, ...soldePchEArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const soldePchE: ISoldePchE = { id: 123 };
        const soldePchE2: ISoldePchE = { id: 456 };
        expectedResult = service.addSoldePchEToCollectionIfMissing([], soldePchE, soldePchE2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(soldePchE);
        expect(expectedResult).toContain(soldePchE2);
      });

      it('should accept null and undefined values', () => {
        const soldePchE: ISoldePchE = { id: 123 };
        expectedResult = service.addSoldePchEToCollectionIfMissing([], null, soldePchE, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(soldePchE);
      });

      it('should return initial array if no SoldePchE is added', () => {
        const soldePchECollection: ISoldePchE[] = [{ id: 123 }];
        expectedResult = service.addSoldePchEToCollectionIfMissing(soldePchECollection, undefined, null);
        expect(expectedResult).toEqual(soldePchECollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
