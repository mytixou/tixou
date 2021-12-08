import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INatureMontant, NatureMontant } from '../nature-montant.model';

import { NatureMontantService } from './nature-montant.service';

describe('NatureMontant Service', () => {
  let service: NatureMontantService;
  let httpMock: HttpTestingController;
  let elemDefault: INatureMontant;
  let expectedResult: INatureMontant | INatureMontant[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NatureMontantService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      code: 'AAAAAAA',
      libelle: 'AAAAAAA',
      description: 'AAAAAAA',
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

    it('should create a NatureMontant', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new NatureMontant()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NatureMontant', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          code: 'BBBBBB',
          libelle: 'BBBBBB',
          description: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a NatureMontant', () => {
      const patchObject = Object.assign(
        {
          libelle: 'BBBBBB',
          description: 'BBBBBB',
        },
        new NatureMontant()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NatureMontant', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          code: 'BBBBBB',
          libelle: 'BBBBBB',
          description: 'BBBBBB',
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

    it('should delete a NatureMontant', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addNatureMontantToCollectionIfMissing', () => {
      it('should add a NatureMontant to an empty array', () => {
        const natureMontant: INatureMontant = { id: 123 };
        expectedResult = service.addNatureMontantToCollectionIfMissing([], natureMontant);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(natureMontant);
      });

      it('should not add a NatureMontant to an array that contains it', () => {
        const natureMontant: INatureMontant = { id: 123 };
        const natureMontantCollection: INatureMontant[] = [
          {
            ...natureMontant,
          },
          { id: 456 },
        ];
        expectedResult = service.addNatureMontantToCollectionIfMissing(natureMontantCollection, natureMontant);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NatureMontant to an array that doesn't contain it", () => {
        const natureMontant: INatureMontant = { id: 123 };
        const natureMontantCollection: INatureMontant[] = [{ id: 456 }];
        expectedResult = service.addNatureMontantToCollectionIfMissing(natureMontantCollection, natureMontant);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(natureMontant);
      });

      it('should add only unique NatureMontant to an array', () => {
        const natureMontantArray: INatureMontant[] = [{ id: 123 }, { id: 456 }, { id: 72008 }];
        const natureMontantCollection: INatureMontant[] = [{ id: 123 }];
        expectedResult = service.addNatureMontantToCollectionIfMissing(natureMontantCollection, ...natureMontantArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const natureMontant: INatureMontant = { id: 123 };
        const natureMontant2: INatureMontant = { id: 456 };
        expectedResult = service.addNatureMontantToCollectionIfMissing([], natureMontant, natureMontant2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(natureMontant);
        expect(expectedResult).toContain(natureMontant2);
      });

      it('should accept null and undefined values', () => {
        const natureMontant: INatureMontant = { id: 123 };
        expectedResult = service.addNatureMontantToCollectionIfMissing([], null, natureMontant, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(natureMontant);
      });

      it('should return initial array if no NatureMontant is added', () => {
        const natureMontantCollection: INatureMontant[] = [{ id: 123 }];
        expectedResult = service.addNatureMontantToCollectionIfMissing(natureMontantCollection, undefined, null);
        expect(expectedResult).toEqual(natureMontantCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
