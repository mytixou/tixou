import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IChoixReponse, ChoixReponse } from '../choix-reponse.model';

import { ChoixReponseService } from './choix-reponse.service';

describe('ChoixReponse Service', () => {
  let service: ChoixReponseService;
  let httpMock: HttpTestingController;
  let elemDefault: IChoixReponse;
  let expectedResult: IChoixReponse | IChoixReponse[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ChoixReponseService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      dateChoix: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          dateChoix: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ChoixReponse', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          dateChoix: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateChoix: currentDate,
        },
        returnedFromService
      );

      service.create(new ChoixReponse()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ChoixReponse', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          dateChoix: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateChoix: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ChoixReponse', () => {
      const patchObject = Object.assign(
        {
          dateChoix: currentDate.format(DATE_TIME_FORMAT),
        },
        new ChoixReponse()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          dateChoix: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ChoixReponse', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          dateChoix: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateChoix: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ChoixReponse', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addChoixReponseToCollectionIfMissing', () => {
      it('should add a ChoixReponse to an empty array', () => {
        const choixReponse: IChoixReponse = { id: 123 };
        expectedResult = service.addChoixReponseToCollectionIfMissing([], choixReponse);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(choixReponse);
      });

      it('should not add a ChoixReponse to an array that contains it', () => {
        const choixReponse: IChoixReponse = { id: 123 };
        const choixReponseCollection: IChoixReponse[] = [
          {
            ...choixReponse,
          },
          { id: 456 },
        ];
        expectedResult = service.addChoixReponseToCollectionIfMissing(choixReponseCollection, choixReponse);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ChoixReponse to an array that doesn't contain it", () => {
        const choixReponse: IChoixReponse = { id: 123 };
        const choixReponseCollection: IChoixReponse[] = [{ id: 456 }];
        expectedResult = service.addChoixReponseToCollectionIfMissing(choixReponseCollection, choixReponse);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(choixReponse);
      });

      it('should add only unique ChoixReponse to an array', () => {
        const choixReponseArray: IChoixReponse[] = [{ id: 123 }, { id: 456 }, { id: 32228 }];
        const choixReponseCollection: IChoixReponse[] = [{ id: 123 }];
        expectedResult = service.addChoixReponseToCollectionIfMissing(choixReponseCollection, ...choixReponseArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const choixReponse: IChoixReponse = { id: 123 };
        const choixReponse2: IChoixReponse = { id: 456 };
        expectedResult = service.addChoixReponseToCollectionIfMissing([], choixReponse, choixReponse2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(choixReponse);
        expect(expectedResult).toContain(choixReponse2);
      });

      it('should accept null and undefined values', () => {
        const choixReponse: IChoixReponse = { id: 123 };
        expectedResult = service.addChoixReponseToCollectionIfMissing([], null, choixReponse, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(choixReponse);
      });

      it('should return initial array if no ChoixReponse is added', () => {
        const choixReponseCollection: IChoixReponse[] = [{ id: 123 }];
        expectedResult = service.addChoixReponseToCollectionIfMissing(choixReponseCollection, undefined, null);
        expect(expectedResult).toEqual(choixReponseCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
