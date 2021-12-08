import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IConsommationApa, ConsommationApa } from '../consommation-apa.model';

import { ConsommationApaService } from './consommation-apa.service';

describe('ConsommationApa Service', () => {
  let service: ConsommationApaService;
  let httpMock: HttpTestingController;
  let elemDefault: IConsommationApa;
  let expectedResult: IConsommationApa | IConsommationApa[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConsommationApaService);
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

    it('should create a ConsommationApa', () => {
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

      service.create(new ConsommationApa()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ConsommationApa', () => {
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

    it('should partial update a ConsommationApa', () => {
      const patchObject = Object.assign(
        {
          date: currentDate.format(DATE_TIME_FORMAT),
        },
        new ConsommationApa()
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

    it('should return a list of ConsommationApa', () => {
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

    it('should delete a ConsommationApa', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addConsommationApaToCollectionIfMissing', () => {
      it('should add a ConsommationApa to an empty array', () => {
        const consommationApa: IConsommationApa = { id: 123 };
        expectedResult = service.addConsommationApaToCollectionIfMissing([], consommationApa);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consommationApa);
      });

      it('should not add a ConsommationApa to an array that contains it', () => {
        const consommationApa: IConsommationApa = { id: 123 };
        const consommationApaCollection: IConsommationApa[] = [
          {
            ...consommationApa,
          },
          { id: 456 },
        ];
        expectedResult = service.addConsommationApaToCollectionIfMissing(consommationApaCollection, consommationApa);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ConsommationApa to an array that doesn't contain it", () => {
        const consommationApa: IConsommationApa = { id: 123 };
        const consommationApaCollection: IConsommationApa[] = [{ id: 456 }];
        expectedResult = service.addConsommationApaToCollectionIfMissing(consommationApaCollection, consommationApa);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consommationApa);
      });

      it('should add only unique ConsommationApa to an array', () => {
        const consommationApaArray: IConsommationApa[] = [{ id: 123 }, { id: 456 }, { id: 83162 }];
        const consommationApaCollection: IConsommationApa[] = [{ id: 123 }];
        expectedResult = service.addConsommationApaToCollectionIfMissing(consommationApaCollection, ...consommationApaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const consommationApa: IConsommationApa = { id: 123 };
        const consommationApa2: IConsommationApa = { id: 456 };
        expectedResult = service.addConsommationApaToCollectionIfMissing([], consommationApa, consommationApa2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consommationApa);
        expect(expectedResult).toContain(consommationApa2);
      });

      it('should accept null and undefined values', () => {
        const consommationApa: IConsommationApa = { id: 123 };
        expectedResult = service.addConsommationApaToCollectionIfMissing([], null, consommationApa, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consommationApa);
      });

      it('should return initial array if no ConsommationApa is added', () => {
        const consommationApaCollection: IConsommationApa[] = [{ id: 123 }];
        expectedResult = service.addConsommationApaToCollectionIfMissing(consommationApaCollection, undefined, null);
        expect(expectedResult).toEqual(consommationApaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
