import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IStrategieCi, StrategieCi } from '../strategie-ci.model';

import { StrategieCiService } from './strategie-ci.service';

describe('StrategieCi Service', () => {
  let service: StrategieCiService;
  let httpMock: HttpTestingController;
  let elemDefault: IStrategieCi;
  let expectedResult: IStrategieCi | IStrategieCi[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StrategieCiService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      isActif: false,
      anne: 0,
      montantPlafond: 0,
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

    it('should create a StrategieCi', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new StrategieCi()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StrategieCi', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          isActif: true,
          anne: 1,
          montantPlafond: 1,
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

    it('should partial update a StrategieCi', () => {
      const patchObject = Object.assign(
        {
          anne: 1,
          montantPlafond: 1,
          taux: 1,
        },
        new StrategieCi()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StrategieCi', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          isActif: true,
          anne: 1,
          montantPlafond: 1,
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

    it('should delete a StrategieCi', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addStrategieCiToCollectionIfMissing', () => {
      it('should add a StrategieCi to an empty array', () => {
        const strategieCi: IStrategieCi = { id: 123 };
        expectedResult = service.addStrategieCiToCollectionIfMissing([], strategieCi);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(strategieCi);
      });

      it('should not add a StrategieCi to an array that contains it', () => {
        const strategieCi: IStrategieCi = { id: 123 };
        const strategieCiCollection: IStrategieCi[] = [
          {
            ...strategieCi,
          },
          { id: 456 },
        ];
        expectedResult = service.addStrategieCiToCollectionIfMissing(strategieCiCollection, strategieCi);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StrategieCi to an array that doesn't contain it", () => {
        const strategieCi: IStrategieCi = { id: 123 };
        const strategieCiCollection: IStrategieCi[] = [{ id: 456 }];
        expectedResult = service.addStrategieCiToCollectionIfMissing(strategieCiCollection, strategieCi);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(strategieCi);
      });

      it('should add only unique StrategieCi to an array', () => {
        const strategieCiArray: IStrategieCi[] = [{ id: 123 }, { id: 456 }, { id: 12754 }];
        const strategieCiCollection: IStrategieCi[] = [{ id: 123 }];
        expectedResult = service.addStrategieCiToCollectionIfMissing(strategieCiCollection, ...strategieCiArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const strategieCi: IStrategieCi = { id: 123 };
        const strategieCi2: IStrategieCi = { id: 456 };
        expectedResult = service.addStrategieCiToCollectionIfMissing([], strategieCi, strategieCi2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(strategieCi);
        expect(expectedResult).toContain(strategieCi2);
      });

      it('should accept null and undefined values', () => {
        const strategieCi: IStrategieCi = { id: 123 };
        expectedResult = service.addStrategieCiToCollectionIfMissing([], null, strategieCi, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(strategieCi);
      });

      it('should return initial array if no StrategieCi is added', () => {
        const strategieCiCollection: IStrategieCi[] = [{ id: 123 }];
        expectedResult = service.addStrategieCiToCollectionIfMissing(strategieCiCollection, undefined, null);
        expect(expectedResult).toEqual(strategieCiCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
