import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IStrategiePch, StrategiePch } from '../strategie-pch.model';

import { StrategiePchService } from './strategie-pch.service';

describe('StrategiePch Service', () => {
  let service: StrategiePchService;
  let httpMock: HttpTestingController;
  let elemDefault: IStrategiePch;
  let expectedResult: IStrategiePch | IStrategiePch[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StrategiePchService);
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

    it('should create a StrategiePch', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new StrategiePch()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StrategiePch', () => {
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

    it('should partial update a StrategiePch', () => {
      const patchObject = Object.assign(
        {
          isActif: true,
          anne: 1,
          montantPlafond: 1,
          nbPlafondheure: 1,
        },
        new StrategiePch()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StrategiePch', () => {
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

    it('should delete a StrategiePch', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addStrategiePchToCollectionIfMissing', () => {
      it('should add a StrategiePch to an empty array', () => {
        const strategiePch: IStrategiePch = { id: 123 };
        expectedResult = service.addStrategiePchToCollectionIfMissing([], strategiePch);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(strategiePch);
      });

      it('should not add a StrategiePch to an array that contains it', () => {
        const strategiePch: IStrategiePch = { id: 123 };
        const strategiePchCollection: IStrategiePch[] = [
          {
            ...strategiePch,
          },
          { id: 456 },
        ];
        expectedResult = service.addStrategiePchToCollectionIfMissing(strategiePchCollection, strategiePch);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StrategiePch to an array that doesn't contain it", () => {
        const strategiePch: IStrategiePch = { id: 123 };
        const strategiePchCollection: IStrategiePch[] = [{ id: 456 }];
        expectedResult = service.addStrategiePchToCollectionIfMissing(strategiePchCollection, strategiePch);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(strategiePch);
      });

      it('should add only unique StrategiePch to an array', () => {
        const strategiePchArray: IStrategiePch[] = [{ id: 123 }, { id: 456 }, { id: 80282 }];
        const strategiePchCollection: IStrategiePch[] = [{ id: 123 }];
        expectedResult = service.addStrategiePchToCollectionIfMissing(strategiePchCollection, ...strategiePchArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const strategiePch: IStrategiePch = { id: 123 };
        const strategiePch2: IStrategiePch = { id: 456 };
        expectedResult = service.addStrategiePchToCollectionIfMissing([], strategiePch, strategiePch2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(strategiePch);
        expect(expectedResult).toContain(strategiePch2);
      });

      it('should accept null and undefined values', () => {
        const strategiePch: IStrategiePch = { id: 123 };
        expectedResult = service.addStrategiePchToCollectionIfMissing([], null, strategiePch, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(strategiePch);
      });

      it('should return initial array if no StrategiePch is added', () => {
        const strategiePchCollection: IStrategiePch[] = [{ id: 123 }];
        expectedResult = service.addStrategiePchToCollectionIfMissing(strategiePchCollection, undefined, null);
        expect(expectedResult).toEqual(strategiePchCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
