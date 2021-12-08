jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITiersFinanceur, TiersFinanceur } from '../tiers-financeur.model';
import { TiersFinanceurService } from '../service/tiers-financeur.service';

import { TiersFinanceurRoutingResolveService } from './tiers-financeur-routing-resolve.service';

describe('TiersFinanceur routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TiersFinanceurRoutingResolveService;
  let service: TiersFinanceurService;
  let resultTiersFinanceur: ITiersFinanceur | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(TiersFinanceurRoutingResolveService);
    service = TestBed.inject(TiersFinanceurService);
    resultTiersFinanceur = undefined;
  });

  describe('resolve', () => {
    it('should return ITiersFinanceur returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTiersFinanceur = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTiersFinanceur).toEqual({ id: 123 });
    });

    it('should return new ITiersFinanceur if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTiersFinanceur = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTiersFinanceur).toEqual(new TiersFinanceur());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TiersFinanceur })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTiersFinanceur = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTiersFinanceur).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
