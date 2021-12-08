import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IConsommationPchE, ConsommationPchE } from '../consommation-pch-e.model';

import { ConsommationPchEService } from './consommation-pch-e.service';

describe('ConsommationPchE Service', () => {
  let service: ConsommationPchEService;
  let httpMock: HttpTestingController;
  let elemDefault: IConsommationPchE;
  let expectedResult: IConsommationPchE | IConsommationPchE[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConsommationPchEService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      date: currentDate,
      montantCotisations: 0,
      nbHeures: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          date: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ConsommationPchE', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          date: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          date: currentDate,
        },
        returnedFromService
      );

      service.create(new ConsommationPchE()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ConsommationPchE', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          date: currentDate.format(DATE_TIME_FORMAT),
          montantCotisations: 1,
          nbHeures: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          date: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ConsommationPchE', () => {
      const patchObject = Object.assign(
        {
          date: currentDate.format(DATE_TIME_FORMAT),
          nbHeures: 1,
        },
        new ConsommationPchE()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          date: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ConsommationPchE', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          date: currentDate.format(DATE_TIME_FORMAT),
          montantCotisations: 1,
          nbHeures: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          date: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ConsommationPchE', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addConsommationPchEToCollectionIfMissing', () => {
      it('should add a ConsommationPchE to an empty array', () => {
        const consommationPchE: IConsommationPchE = { id: 123 };
        expectedResult = service.addConsommationPchEToCollectionIfMissing([], consommationPchE);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consommationPchE);
      });

      it('should not add a ConsommationPchE to an array that contains it', () => {
        const consommationPchE: IConsommationPchE = { id: 123 };
        const consommationPchECollection: IConsommationPchE[] = [
          {
            ...consommationPchE,
          },
          { id: 456 },
        ];
        expectedResult = service.addConsommationPchEToCollectionIfMissing(consommationPchECollection, consommationPchE);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ConsommationPchE to an array that doesn't contain it", () => {
        const consommationPchE: IConsommationPchE = { id: 123 };
        const consommationPchECollection: IConsommationPchE[] = [{ id: 456 }];
        expectedResult = service.addConsommationPchEToCollectionIfMissing(consommationPchECollection, consommationPchE);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consommationPchE);
      });

      it('should add only unique ConsommationPchE to an array', () => {
        const consommationPchEArray: IConsommationPchE[] = [{ id: 123 }, { id: 456 }, { id: 66671 }];
        const consommationPchECollection: IConsommationPchE[] = [{ id: 123 }];
        expectedResult = service.addConsommationPchEToCollectionIfMissing(consommationPchECollection, ...consommationPchEArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const consommationPchE: IConsommationPchE = { id: 123 };
        const consommationPchE2: IConsommationPchE = { id: 456 };
        expectedResult = service.addConsommationPchEToCollectionIfMissing([], consommationPchE, consommationPchE2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consommationPchE);
        expect(expectedResult).toContain(consommationPchE2);
      });

      it('should accept null and undefined values', () => {
        const consommationPchE: IConsommationPchE = { id: 123 };
        expectedResult = service.addConsommationPchEToCollectionIfMissing([], null, consommationPchE, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consommationPchE);
      });

      it('should return initial array if no ConsommationPchE is added', () => {
        const consommationPchECollection: IConsommationPchE[] = [{ id: 123 }];
        expectedResult = service.addConsommationPchEToCollectionIfMissing(consommationPchECollection, undefined, null);
        expect(expectedResult).toEqual(consommationPchECollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
