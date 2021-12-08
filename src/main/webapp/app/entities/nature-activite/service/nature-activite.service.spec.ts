import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INatureActivite, NatureActivite } from '../nature-activite.model';

import { NatureActiviteService } from './nature-activite.service';

describe('NatureActivite Service', () => {
  let service: NatureActiviteService;
  let httpMock: HttpTestingController;
  let elemDefault: INatureActivite;
  let expectedResult: INatureActivite | INatureActivite[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NatureActiviteService);
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

    it('should create a NatureActivite', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new NatureActivite()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NatureActivite', () => {
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

    it('should partial update a NatureActivite', () => {
      const patchObject = Object.assign(
        {
          code: 'BBBBBB',
          description: 'BBBBBB',
        },
        new NatureActivite()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NatureActivite', () => {
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

    it('should delete a NatureActivite', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addNatureActiviteToCollectionIfMissing', () => {
      it('should add a NatureActivite to an empty array', () => {
        const natureActivite: INatureActivite = { id: 123 };
        expectedResult = service.addNatureActiviteToCollectionIfMissing([], natureActivite);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(natureActivite);
      });

      it('should not add a NatureActivite to an array that contains it', () => {
        const natureActivite: INatureActivite = { id: 123 };
        const natureActiviteCollection: INatureActivite[] = [
          {
            ...natureActivite,
          },
          { id: 456 },
        ];
        expectedResult = service.addNatureActiviteToCollectionIfMissing(natureActiviteCollection, natureActivite);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NatureActivite to an array that doesn't contain it", () => {
        const natureActivite: INatureActivite = { id: 123 };
        const natureActiviteCollection: INatureActivite[] = [{ id: 456 }];
        expectedResult = service.addNatureActiviteToCollectionIfMissing(natureActiviteCollection, natureActivite);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(natureActivite);
      });

      it('should add only unique NatureActivite to an array', () => {
        const natureActiviteArray: INatureActivite[] = [{ id: 123 }, { id: 456 }, { id: 35198 }];
        const natureActiviteCollection: INatureActivite[] = [{ id: 123 }];
        expectedResult = service.addNatureActiviteToCollectionIfMissing(natureActiviteCollection, ...natureActiviteArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const natureActivite: INatureActivite = { id: 123 };
        const natureActivite2: INatureActivite = { id: 456 };
        expectedResult = service.addNatureActiviteToCollectionIfMissing([], natureActivite, natureActivite2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(natureActivite);
        expect(expectedResult).toContain(natureActivite2);
      });

      it('should accept null and undefined values', () => {
        const natureActivite: INatureActivite = { id: 123 };
        expectedResult = service.addNatureActiviteToCollectionIfMissing([], null, natureActivite, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(natureActivite);
      });

      it('should return initial array if no NatureActivite is added', () => {
        const natureActiviteCollection: INatureActivite[] = [{ id: 123 }];
        expectedResult = service.addNatureActiviteToCollectionIfMissing(natureActiviteCollection, undefined, null);
        expect(expectedResult).toEqual(natureActiviteCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
