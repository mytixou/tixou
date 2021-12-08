import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IConsommationCi, ConsommationCi } from '../consommation-ci.model';

import { ConsommationCiService } from './consommation-ci.service';

describe('ConsommationCi Service', () => {
  let service: ConsommationCiService;
  let httpMock: HttpTestingController;
  let elemDefault: IConsommationCi;
  let expectedResult: IConsommationCi | IConsommationCi[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConsommationCiService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      date: currentDate,
      montantCi: 0,
      montantRecuperable: 0,
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

    it('should create a ConsommationCi', () => {
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

      service.create(new ConsommationCi()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ConsommationCi', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          date: currentDate.format(DATE_TIME_FORMAT),
          montantCi: 1,
          montantRecuperable: 1,
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

    it('should partial update a ConsommationCi', () => {
      const patchObject = Object.assign(
        {
          date: currentDate.format(DATE_TIME_FORMAT),
          montantCi: 1,
        },
        new ConsommationCi()
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

    it('should return a list of ConsommationCi', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          date: currentDate.format(DATE_TIME_FORMAT),
          montantCi: 1,
          montantRecuperable: 1,
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

    it('should delete a ConsommationCi', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addConsommationCiToCollectionIfMissing', () => {
      it('should add a ConsommationCi to an empty array', () => {
        const consommationCi: IConsommationCi = { id: 123 };
        expectedResult = service.addConsommationCiToCollectionIfMissing([], consommationCi);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consommationCi);
      });

      it('should not add a ConsommationCi to an array that contains it', () => {
        const consommationCi: IConsommationCi = { id: 123 };
        const consommationCiCollection: IConsommationCi[] = [
          {
            ...consommationCi,
          },
          { id: 456 },
        ];
        expectedResult = service.addConsommationCiToCollectionIfMissing(consommationCiCollection, consommationCi);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ConsommationCi to an array that doesn't contain it", () => {
        const consommationCi: IConsommationCi = { id: 123 };
        const consommationCiCollection: IConsommationCi[] = [{ id: 456 }];
        expectedResult = service.addConsommationCiToCollectionIfMissing(consommationCiCollection, consommationCi);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consommationCi);
      });

      it('should add only unique ConsommationCi to an array', () => {
        const consommationCiArray: IConsommationCi[] = [{ id: 123 }, { id: 456 }, { id: 6293 }];
        const consommationCiCollection: IConsommationCi[] = [{ id: 123 }];
        expectedResult = service.addConsommationCiToCollectionIfMissing(consommationCiCollection, ...consommationCiArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const consommationCi: IConsommationCi = { id: 123 };
        const consommationCi2: IConsommationCi = { id: 456 };
        expectedResult = service.addConsommationCiToCollectionIfMissing([], consommationCi, consommationCi2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consommationCi);
        expect(expectedResult).toContain(consommationCi2);
      });

      it('should accept null and undefined values', () => {
        const consommationCi: IConsommationCi = { id: 123 };
        expectedResult = service.addConsommationCiToCollectionIfMissing([], null, consommationCi, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consommationCi);
      });

      it('should return initial array if no ConsommationCi is added', () => {
        const consommationCiCollection: IConsommationCi[] = [{ id: 123 }];
        expectedResult = service.addConsommationCiToCollectionIfMissing(consommationCiCollection, undefined, null);
        expect(expectedResult).toEqual(consommationCiCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
