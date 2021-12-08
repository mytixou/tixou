import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ITiersFinanceur, TiersFinanceur } from '../tiers-financeur.model';

import { TiersFinanceurService } from './tiers-financeur.service';

describe('TiersFinanceur Service', () => {
  let service: TiersFinanceurService;
  let httpMock: HttpTestingController;
  let elemDefault: ITiersFinanceur;
  let expectedResult: ITiersFinanceur | ITiersFinanceur[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TiersFinanceurService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      nom: 'AAAAAAA',
      localisation: 'AAAAAAA',
      isActif: false,
      dateInscription: currentDate,
      anneLancement: 0,
      moisLancement: 0,
      dateResiliation: currentDate,
      derniereAnnee: 0,
      dernierMois: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          dateInscription: currentDate.format(DATE_FORMAT),
          dateResiliation: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a TiersFinanceur', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          dateInscription: currentDate.format(DATE_FORMAT),
          dateResiliation: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateInscription: currentDate,
          dateResiliation: currentDate,
        },
        returnedFromService
      );

      service.create(new TiersFinanceur()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TiersFinanceur', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nom: 'BBBBBB',
          localisation: 'BBBBBB',
          isActif: true,
          dateInscription: currentDate.format(DATE_FORMAT),
          anneLancement: 1,
          moisLancement: 1,
          dateResiliation: currentDate.format(DATE_FORMAT),
          derniereAnnee: 1,
          dernierMois: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateInscription: currentDate,
          dateResiliation: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TiersFinanceur', () => {
      const patchObject = Object.assign(
        {
          isActif: true,
          anneLancement: 1,
          derniereAnnee: 1,
          dernierMois: 1,
        },
        new TiersFinanceur()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          dateInscription: currentDate,
          dateResiliation: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TiersFinanceur', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nom: 'BBBBBB',
          localisation: 'BBBBBB',
          isActif: true,
          dateInscription: currentDate.format(DATE_FORMAT),
          anneLancement: 1,
          moisLancement: 1,
          dateResiliation: currentDate.format(DATE_FORMAT),
          derniereAnnee: 1,
          dernierMois: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateInscription: currentDate,
          dateResiliation: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a TiersFinanceur', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTiersFinanceurToCollectionIfMissing', () => {
      it('should add a TiersFinanceur to an empty array', () => {
        const tiersFinanceur: ITiersFinanceur = { id: 123 };
        expectedResult = service.addTiersFinanceurToCollectionIfMissing([], tiersFinanceur);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tiersFinanceur);
      });

      it('should not add a TiersFinanceur to an array that contains it', () => {
        const tiersFinanceur: ITiersFinanceur = { id: 123 };
        const tiersFinanceurCollection: ITiersFinanceur[] = [
          {
            ...tiersFinanceur,
          },
          { id: 456 },
        ];
        expectedResult = service.addTiersFinanceurToCollectionIfMissing(tiersFinanceurCollection, tiersFinanceur);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TiersFinanceur to an array that doesn't contain it", () => {
        const tiersFinanceur: ITiersFinanceur = { id: 123 };
        const tiersFinanceurCollection: ITiersFinanceur[] = [{ id: 456 }];
        expectedResult = service.addTiersFinanceurToCollectionIfMissing(tiersFinanceurCollection, tiersFinanceur);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tiersFinanceur);
      });

      it('should add only unique TiersFinanceur to an array', () => {
        const tiersFinanceurArray: ITiersFinanceur[] = [{ id: 123 }, { id: 456 }, { id: 37923 }];
        const tiersFinanceurCollection: ITiersFinanceur[] = [{ id: 123 }];
        expectedResult = service.addTiersFinanceurToCollectionIfMissing(tiersFinanceurCollection, ...tiersFinanceurArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tiersFinanceur: ITiersFinanceur = { id: 123 };
        const tiersFinanceur2: ITiersFinanceur = { id: 456 };
        expectedResult = service.addTiersFinanceurToCollectionIfMissing([], tiersFinanceur, tiersFinanceur2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tiersFinanceur);
        expect(expectedResult).toContain(tiersFinanceur2);
      });

      it('should accept null and undefined values', () => {
        const tiersFinanceur: ITiersFinanceur = { id: 123 };
        expectedResult = service.addTiersFinanceurToCollectionIfMissing([], null, tiersFinanceur, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tiersFinanceur);
      });

      it('should return initial array if no TiersFinanceur is added', () => {
        const tiersFinanceurCollection: ITiersFinanceur[] = [{ id: 123 }];
        expectedResult = service.addTiersFinanceurToCollectionIfMissing(tiersFinanceurCollection, undefined, null);
        expect(expectedResult).toEqual(tiersFinanceurCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
