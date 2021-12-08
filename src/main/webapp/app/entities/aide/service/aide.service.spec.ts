import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { TypeAide } from 'app/entities/enumerations/type-aide.model';
import { IAide, Aide } from '../aide.model';

import { AideService } from './aide.service';

describe('Aide Service', () => {
  let service: AideService;
  let httpMock: HttpTestingController;
  let elemDefault: IAide;
  let expectedResult: IAide | IAide[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AideService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      nom: TypeAide.CI,
      isActif: false,
      dateLancement: currentDate,
      anneLancement: 0,
      moisLancement: 0,
      dateArret: currentDate,
      derniereAnnee: 0,
      dernierMois: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          dateLancement: currentDate.format(DATE_FORMAT),
          dateArret: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Aide', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          dateLancement: currentDate.format(DATE_FORMAT),
          dateArret: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateLancement: currentDate,
          dateArret: currentDate,
        },
        returnedFromService
      );

      service.create(new Aide()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Aide', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nom: 'BBBBBB',
          isActif: true,
          dateLancement: currentDate.format(DATE_FORMAT),
          anneLancement: 1,
          moisLancement: 1,
          dateArret: currentDate.format(DATE_FORMAT),
          derniereAnnee: 1,
          dernierMois: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateLancement: currentDate,
          dateArret: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Aide', () => {
      const patchObject = Object.assign(
        {
          isActif: true,
          anneLancement: 1,
          moisLancement: 1,
          dateArret: currentDate.format(DATE_FORMAT),
        },
        new Aide()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          dateLancement: currentDate,
          dateArret: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Aide', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nom: 'BBBBBB',
          isActif: true,
          dateLancement: currentDate.format(DATE_FORMAT),
          anneLancement: 1,
          moisLancement: 1,
          dateArret: currentDate.format(DATE_FORMAT),
          derniereAnnee: 1,
          dernierMois: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateLancement: currentDate,
          dateArret: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Aide', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAideToCollectionIfMissing', () => {
      it('should add a Aide to an empty array', () => {
        const aide: IAide = { id: 123 };
        expectedResult = service.addAideToCollectionIfMissing([], aide);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(aide);
      });

      it('should not add a Aide to an array that contains it', () => {
        const aide: IAide = { id: 123 };
        const aideCollection: IAide[] = [
          {
            ...aide,
          },
          { id: 456 },
        ];
        expectedResult = service.addAideToCollectionIfMissing(aideCollection, aide);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Aide to an array that doesn't contain it", () => {
        const aide: IAide = { id: 123 };
        const aideCollection: IAide[] = [{ id: 456 }];
        expectedResult = service.addAideToCollectionIfMissing(aideCollection, aide);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(aide);
      });

      it('should add only unique Aide to an array', () => {
        const aideArray: IAide[] = [{ id: 123 }, { id: 456 }, { id: 62349 }];
        const aideCollection: IAide[] = [{ id: 123 }];
        expectedResult = service.addAideToCollectionIfMissing(aideCollection, ...aideArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const aide: IAide = { id: 123 };
        const aide2: IAide = { id: 456 };
        expectedResult = service.addAideToCollectionIfMissing([], aide, aide2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(aide);
        expect(expectedResult).toContain(aide2);
      });

      it('should accept null and undefined values', () => {
        const aide: IAide = { id: 123 };
        expectedResult = service.addAideToCollectionIfMissing([], null, aide, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(aide);
      });

      it('should return initial array if no Aide is added', () => {
        const aideCollection: IAide[] = [{ id: 123 }];
        expectedResult = service.addAideToCollectionIfMissing(aideCollection, undefined, null);
        expect(expectedResult).toEqual(aideCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
