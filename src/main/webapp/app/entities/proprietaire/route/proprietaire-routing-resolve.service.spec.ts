jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IProprietaire, Proprietaire } from '../proprietaire.model';
import { ProprietaireService } from '../service/proprietaire.service';

import { ProprietaireRoutingResolveService } from './proprietaire-routing-resolve.service';

describe('Proprietaire routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ProprietaireRoutingResolveService;
  let service: ProprietaireService;
  let resultProprietaire: IProprietaire | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(ProprietaireRoutingResolveService);
    service = TestBed.inject(ProprietaireService);
    resultProprietaire = undefined;
  });

  describe('resolve', () => {
    it('should return IProprietaire returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProprietaire = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultProprietaire).toEqual({ id: 123 });
    });

    it('should return new IProprietaire if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProprietaire = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultProprietaire).toEqual(new Proprietaire());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Proprietaire })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProprietaire = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultProprietaire).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
