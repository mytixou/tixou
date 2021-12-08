import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IStrategiePchE, StrategiePchE } from '../strategie-pch-e.model';

import { StrategiePchEService } from './strategie-pch-e.service';

describe('StrategiePchE Service', () => {
  let service: StrategiePchEService;
  let httpMock: HttpTestingController;
  let elemDefault: IStrategiePchE;
  let expectedResult: IStrategiePchE | IStrategiePchE[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StrategiePchEService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      isActif: false,
      anne: 0,
      montantPlafond: 0,
      nbPlafondheure: 0,
      taux: 0,
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

    it('should create a StrategiePchE', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new StrategiePchE()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StrategiePchE', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          isActif: true,
          anne: 1,
          montantPlafond: 1,
          nbPlafondheure: 1,
          taux: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a StrategiePchE', () => {
      const patchObject = Object.assign(
        {
          isActif: true,
          anne: 1,
          montantPlafond: 1,
          taux: 1,
        },
        new StrategiePchE()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StrategiePchE', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          isActif: true,
          anne: 1,
          montantPlafond: 1,
          nbPlafondheure: 1,
          taux: 1,
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

    it('should delete a StrategiePchE', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addStrategiePchEToCollectionIfMissing', () => {
      it('should add a StrategiePchE to an empty array', () => {
        const strategiePchE: IStrategiePchE = { id: 123 };
        expectedResult = service.addStrategiePchEToCollectionIfMissing([], strategiePchE);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(strategiePchE);
      });

      it('should not add a StrategiePchE to an array that contains it', () => {
        const strategiePchE: IStrategiePchE = { id: 123 };
        const strategiePchECollection: IStrategiePchE[] = [
          {
            ...strategiePchE,
          },
          { id: 456 },
        ];
        expectedResult = service.addStrategiePchEToCollectionIfMissing(strategiePchECollection, strategiePchE);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StrategiePchE to an array that doesn't contain it", () => {
        const strategiePchE: IStrategiePchE = { id: 123 };
        const strategiePchECollection: IStrategiePchE[] = [{ id: 456 }];
        expectedResult = service.addStrategiePchEToCollectionIfMissing(strategiePchECollection, strategiePchE);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(strategiePchE);
      });

      it('should add only unique StrategiePchE to an array', () => {
        const strategiePchEArray: IStrategiePchE[] = [{ id: 123 }, { id: 456 }, { id: 76922 }];
        const strategiePchECollection: IStrategiePchE[] = [{ id: 123 }];
        expectedResult = service.addStrategiePchEToCollectionIfMissing(strategiePchECollection, ...strategiePchEArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const strategiePchE: IStrategiePchE = { id: 123 };
        const strategiePchE2: IStrategiePchE = { id: 456 };
        expectedResult = service.addStrategiePchEToCollectionIfMissing([], strategiePchE, strategiePchE2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(strategiePchE);
        expect(expectedResult).toContain(strategiePchE2);
      });

      it('should accept null and undefined values', () => {
        const strategiePchE: IStrategiePchE = { id: 123 };
        expectedResult = service.addStrategiePchEToCollectionIfMissing([], null, strategiePchE, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(strategiePchE);
      });

      it('should return initial array if no StrategiePchE is added', () => {
        const strategiePchECollection: IStrategiePchE[] = [{ id: 123 }];
        expectedResult = service.addStrategiePchEToCollectionIfMissing(strategiePchECollection, undefined, null);
        expect(expectedResult).toEqual(strategiePchECollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
