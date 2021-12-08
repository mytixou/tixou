import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IConsommationPch, ConsommationPch } from '../consommation-pch.model';

import { ConsommationPchService } from './consommation-pch.service';

describe('ConsommationPch Service', () => {
  let service: ConsommationPchService;
  let httpMock: HttpTestingController;
  let elemDefault: IConsommationPch;
  let expectedResult: IConsommationPch | IConsommationPch[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConsommationPchService);
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

    it('should create a ConsommationPch', () => {
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

      service.create(new ConsommationPch()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ConsommationPch', () => {
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

    it('should partial update a ConsommationPch', () => {
      const patchObject = Object.assign(
        {
          date: currentDate.format(DATE_TIME_FORMAT),
          montantCotisations: 1,
          nbHeures: 1,
        },
        new ConsommationPch()
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

    it('should return a list of ConsommationPch', () => {
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

    it('should delete a ConsommationPch', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addConsommationPchToCollectionIfMissing', () => {
      it('should add a ConsommationPch to an empty array', () => {
        const consommationPch: IConsommationPch = { id: 123 };
        expectedResult = service.addConsommationPchToCollectionIfMissing([], consommationPch);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consommationPch);
      });

      it('should not add a ConsommationPch to an array that contains it', () => {
        const consommationPch: IConsommationPch = { id: 123 };
        const consommationPchCollection: IConsommationPch[] = [
          {
            ...consommationPch,
          },
          { id: 456 },
        ];
        expectedResult = service.addConsommationPchToCollectionIfMissing(consommationPchCollection, consommationPch);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ConsommationPch to an array that doesn't contain it", () => {
        const consommationPch: IConsommationPch = { id: 123 };
        const consommationPchCollection: IConsommationPch[] = [{ id: 456 }];
        expectedResult = service.addConsommationPchToCollectionIfMissing(consommationPchCollection, consommationPch);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consommationPch);
      });

      it('should add only unique ConsommationPch to an array', () => {
        const consommationPchArray: IConsommationPch[] = [{ id: 123 }, { id: 456 }, { id: 47775 }];
        const consommationPchCollection: IConsommationPch[] = [{ id: 123 }];
        expectedResult = service.addConsommationPchToCollectionIfMissing(consommationPchCollection, ...consommationPchArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const consommationPch: IConsommationPch = { id: 123 };
        const consommationPch2: IConsommationPch = { id: 456 };
        expectedResult = service.addConsommationPchToCollectionIfMissing([], consommationPch, consommationPch2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consommationPch);
        expect(expectedResult).toContain(consommationPch2);
      });

      it('should accept null and undefined values', () => {
        const consommationPch: IConsommationPch = { id: 123 };
        expectedResult = service.addConsommationPchToCollectionIfMissing([], null, consommationPch, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consommationPch);
      });

      it('should return initial array if no ConsommationPch is added', () => {
        const consommationPchCollection: IConsommationPch[] = [{ id: 123 }];
        expectedResult = service.addConsommationPchToCollectionIfMissing(consommationPchCollection, undefined, null);
        expect(expectedResult).toEqual(consommationPchCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
