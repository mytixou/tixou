import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISoldeCi, SoldeCi } from '../solde-ci.model';

import { SoldeCiService } from './solde-ci.service';

describe('SoldeCi Service', () => {
  let service: SoldeCiService;
  let httpMock: HttpTestingController;
  let elemDefault: ISoldeCi;
  let expectedResult: ISoldeCi | ISoldeCi[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SoldeCiService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      annee: 0,
      soldeMontantCi: 0,
      soldeMontantCiRec: 0,
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

    it('should create a SoldeCi', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new SoldeCi()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SoldeCi', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          annee: 1,
          soldeMontantCi: 1,
          soldeMontantCiRec: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SoldeCi', () => {
      const patchObject = Object.assign(
        {
          annee: 1,
          soldeMontantCi: 1,
        },
        new SoldeCi()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SoldeCi', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          annee: 1,
          soldeMontantCi: 1,
          soldeMontantCiRec: 1,
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

    it('should delete a SoldeCi', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSoldeCiToCollectionIfMissing', () => {
      it('should add a SoldeCi to an empty array', () => {
        const soldeCi: ISoldeCi = { id: 123 };
        expectedResult = service.addSoldeCiToCollectionIfMissing([], soldeCi);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(soldeCi);
      });

      it('should not add a SoldeCi to an array that contains it', () => {
        const soldeCi: ISoldeCi = { id: 123 };
        const soldeCiCollection: ISoldeCi[] = [
          {
            ...soldeCi,
          },
          { id: 456 },
        ];
        expectedResult = service.addSoldeCiToCollectionIfMissing(soldeCiCollection, soldeCi);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SoldeCi to an array that doesn't contain it", () => {
        const soldeCi: ISoldeCi = { id: 123 };
        const soldeCiCollection: ISoldeCi[] = [{ id: 456 }];
        expectedResult = service.addSoldeCiToCollectionIfMissing(soldeCiCollection, soldeCi);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(soldeCi);
      });

      it('should add only unique SoldeCi to an array', () => {
        const soldeCiArray: ISoldeCi[] = [{ id: 123 }, { id: 456 }, { id: 80707 }];
        const soldeCiCollection: ISoldeCi[] = [{ id: 123 }];
        expectedResult = service.addSoldeCiToCollectionIfMissing(soldeCiCollection, ...soldeCiArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const soldeCi: ISoldeCi = { id: 123 };
        const soldeCi2: ISoldeCi = { id: 456 };
        expectedResult = service.addSoldeCiToCollectionIfMissing([], soldeCi, soldeCi2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(soldeCi);
        expect(expectedResult).toContain(soldeCi2);
      });

      it('should accept null and undefined values', () => {
        const soldeCi: ISoldeCi = { id: 123 };
        expectedResult = service.addSoldeCiToCollectionIfMissing([], null, soldeCi, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(soldeCi);
      });

      it('should return initial array if no SoldeCi is added', () => {
        const soldeCiCollection: ISoldeCi[] = [{ id: 123 }];
        expectedResult = service.addSoldeCiToCollectionIfMissing(soldeCiCollection, undefined, null);
        expect(expectedResult).toEqual(soldeCiCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
