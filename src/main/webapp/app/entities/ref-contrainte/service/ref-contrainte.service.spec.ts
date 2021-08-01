import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TypeContrainte } from 'app/entities/enumerations/type-contrainte.model';
import { TypeDestination } from 'app/entities/enumerations/type-destination.model';
import { IRefContrainte, RefContrainte } from '../ref-contrainte.model';

import { RefContrainteService } from './ref-contrainte.service';

describe('Service Tests', () => {
  describe('RefContrainte Service', () => {
    let service: RefContrainteService;
    let httpMock: HttpTestingController;
    let elemDefault: IRefContrainte;
    let expectedResult: IRefContrainte | IRefContrainte[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(RefContrainteService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        designation: 'AAAAAAA',
        typeContrainte: TypeContrainte.PLU,
        typeDestination: TypeDestination.TERRAIN,
        explication: 'AAAAAAA',
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

      it('should create a RefContrainte', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new RefContrainte()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RefContrainte', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            designation: 'BBBBBB',
            typeContrainte: 'BBBBBB',
            typeDestination: 'BBBBBB',
            explication: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a RefContrainte', () => {
        const patchObject = Object.assign(
          {
            typeContrainte: 'BBBBBB',
            typeDestination: 'BBBBBB',
          },
          new RefContrainte()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of RefContrainte', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            designation: 'BBBBBB',
            typeContrainte: 'BBBBBB',
            typeDestination: 'BBBBBB',
            explication: 'BBBBBB',
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

      it('should delete a RefContrainte', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addRefContrainteToCollectionIfMissing', () => {
        it('should add a RefContrainte to an empty array', () => {
          const refContrainte: IRefContrainte = { id: 123 };
          expectedResult = service.addRefContrainteToCollectionIfMissing([], refContrainte);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(refContrainte);
        });

        it('should not add a RefContrainte to an array that contains it', () => {
          const refContrainte: IRefContrainte = { id: 123 };
          const refContrainteCollection: IRefContrainte[] = [
            {
              ...refContrainte,
            },
            { id: 456 },
          ];
          expectedResult = service.addRefContrainteToCollectionIfMissing(refContrainteCollection, refContrainte);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a RefContrainte to an array that doesn't contain it", () => {
          const refContrainte: IRefContrainte = { id: 123 };
          const refContrainteCollection: IRefContrainte[] = [{ id: 456 }];
          expectedResult = service.addRefContrainteToCollectionIfMissing(refContrainteCollection, refContrainte);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(refContrainte);
        });

        it('should add only unique RefContrainte to an array', () => {
          const refContrainteArray: IRefContrainte[] = [{ id: 123 }, { id: 456 }, { id: 68584 }];
          const refContrainteCollection: IRefContrainte[] = [{ id: 123 }];
          expectedResult = service.addRefContrainteToCollectionIfMissing(refContrainteCollection, ...refContrainteArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const refContrainte: IRefContrainte = { id: 123 };
          const refContrainte2: IRefContrainte = { id: 456 };
          expectedResult = service.addRefContrainteToCollectionIfMissing([], refContrainte, refContrainte2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(refContrainte);
          expect(expectedResult).toContain(refContrainte2);
        });

        it('should accept null and undefined values', () => {
          const refContrainte: IRefContrainte = { id: 123 };
          expectedResult = service.addRefContrainteToCollectionIfMissing([], null, refContrainte, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(refContrainte);
        });

        it('should return initial array if no RefContrainte is added', () => {
          const refContrainteCollection: IRefContrainte[] = [{ id: 123 }];
          expectedResult = service.addRefContrainteToCollectionIfMissing(refContrainteCollection, undefined, null);
          expect(expectedResult).toEqual(refContrainteCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
