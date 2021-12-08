import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ICommanditaire, Commanditaire } from '../commanditaire.model';

import { CommanditaireService } from './commanditaire.service';

describe('Commanditaire Service', () => {
  let service: CommanditaireService;
  let httpMock: HttpTestingController;
  let elemDefault: ICommanditaire;
  let expectedResult: ICommanditaire | ICommanditaire[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CommanditaireService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      idMetierInterne: 'AAAAAAA',
      prenom: 'AAAAAAA',
      nom: 'AAAAAAA',
      email: 'AAAAAAA',
      telephoneFixe: 'AAAAAAA',
      telephonePortable: 'AAAAAAA',
      connuDepuis: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          connuDepuis: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Commanditaire', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          connuDepuis: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          connuDepuis: currentDate,
        },
        returnedFromService
      );

      service.create(new Commanditaire()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Commanditaire', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          idMetierInterne: 'BBBBBB',
          prenom: 'BBBBBB',
          nom: 'BBBBBB',
          email: 'BBBBBB',
          telephoneFixe: 'BBBBBB',
          telephonePortable: 'BBBBBB',
          connuDepuis: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          connuDepuis: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Commanditaire', () => {
      const patchObject = Object.assign(
        {
          prenom: 'BBBBBB',
          email: 'BBBBBB',
          telephonePortable: 'BBBBBB',
          connuDepuis: currentDate.format(DATE_FORMAT),
        },
        new Commanditaire()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          connuDepuis: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Commanditaire', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          idMetierInterne: 'BBBBBB',
          prenom: 'BBBBBB',
          nom: 'BBBBBB',
          email: 'BBBBBB',
          telephoneFixe: 'BBBBBB',
          telephonePortable: 'BBBBBB',
          connuDepuis: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          connuDepuis: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Commanditaire', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCommanditaireToCollectionIfMissing', () => {
      it('should add a Commanditaire to an empty array', () => {
        const commanditaire: ICommanditaire = { id: 123 };
        expectedResult = service.addCommanditaireToCollectionIfMissing([], commanditaire);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(commanditaire);
      });

      it('should not add a Commanditaire to an array that contains it', () => {
        const commanditaire: ICommanditaire = { id: 123 };
        const commanditaireCollection: ICommanditaire[] = [
          {
            ...commanditaire,
          },
          { id: 456 },
        ];
        expectedResult = service.addCommanditaireToCollectionIfMissing(commanditaireCollection, commanditaire);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Commanditaire to an array that doesn't contain it", () => {
        const commanditaire: ICommanditaire = { id: 123 };
        const commanditaireCollection: ICommanditaire[] = [{ id: 456 }];
        expectedResult = service.addCommanditaireToCollectionIfMissing(commanditaireCollection, commanditaire);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(commanditaire);
      });

      it('should add only unique Commanditaire to an array', () => {
        const commanditaireArray: ICommanditaire[] = [{ id: 123 }, { id: 456 }, { id: 2544 }];
        const commanditaireCollection: ICommanditaire[] = [{ id: 123 }];
        expectedResult = service.addCommanditaireToCollectionIfMissing(commanditaireCollection, ...commanditaireArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const commanditaire: ICommanditaire = { id: 123 };
        const commanditaire2: ICommanditaire = { id: 456 };
        expectedResult = service.addCommanditaireToCollectionIfMissing([], commanditaire, commanditaire2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(commanditaire);
        expect(expectedResult).toContain(commanditaire2);
      });

      it('should accept null and undefined values', () => {
        const commanditaire: ICommanditaire = { id: 123 };
        expectedResult = service.addCommanditaireToCollectionIfMissing([], null, commanditaire, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(commanditaire);
      });

      it('should return initial array if no Commanditaire is added', () => {
        const commanditaireCollection: ICommanditaire[] = [{ id: 123 }];
        expectedResult = service.addCommanditaireToCollectionIfMissing(commanditaireCollection, undefined, null);
        expect(expectedResult).toEqual(commanditaireCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
