import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TypeDestination } from 'app/entities/enumerations/type-destination.model';
import { IImpact, Impact } from '../impact.model';

import { ImpactService } from './impact.service';

describe('Service Tests', () => {
  describe('Impact Service', () => {
    let service: ImpactService;
    let httpMock: HttpTestingController;
    let elemDefault: IImpact;
    let expectedResult: IImpact | IImpact[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ImpactService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        designation: 'AAAAAAA',
        explication: 'AAAAAAA',
        typeImpact: TypeDestination.TERRAIN,
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

      it('should create a Impact', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Impact()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Impact', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            designation: 'BBBBBB',
            explication: 'BBBBBB',
            typeImpact: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Impact', () => {
        const patchObject = Object.assign(
          {
            designation: 'BBBBBB',
            typeImpact: 'BBBBBB',
          },
          new Impact()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Impact', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            designation: 'BBBBBB',
            explication: 'BBBBBB',
            typeImpact: 'BBBBBB',
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

      it('should delete a Impact', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addImpactToCollectionIfMissing', () => {
        it('should add a Impact to an empty array', () => {
          const impact: IImpact = { id: 123 };
          expectedResult = service.addImpactToCollectionIfMissing([], impact);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(impact);
        });

        it('should not add a Impact to an array that contains it', () => {
          const impact: IImpact = { id: 123 };
          const impactCollection: IImpact[] = [
            {
              ...impact,
            },
            { id: 456 },
          ];
          expectedResult = service.addImpactToCollectionIfMissing(impactCollection, impact);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Impact to an array that doesn't contain it", () => {
          const impact: IImpact = { id: 123 };
          const impactCollection: IImpact[] = [{ id: 456 }];
          expectedResult = service.addImpactToCollectionIfMissing(impactCollection, impact);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(impact);
        });

        it('should add only unique Impact to an array', () => {
          const impactArray: IImpact[] = [{ id: 123 }, { id: 456 }, { id: 36822 }];
          const impactCollection: IImpact[] = [{ id: 123 }];
          expectedResult = service.addImpactToCollectionIfMissing(impactCollection, ...impactArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const impact: IImpact = { id: 123 };
          const impact2: IImpact = { id: 456 };
          expectedResult = service.addImpactToCollectionIfMissing([], impact, impact2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(impact);
          expect(expectedResult).toContain(impact2);
        });

        it('should accept null and undefined values', () => {
          const impact: IImpact = { id: 123 };
          expectedResult = service.addImpactToCollectionIfMissing([], null, impact, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(impact);
        });

        it('should return initial array if no Impact is added', () => {
          const impactCollection: IImpact[] = [{ id: 123 }];
          expectedResult = service.addImpactToCollectionIfMissing(impactCollection, undefined, null);
          expect(expectedResult).toEqual(impactCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
