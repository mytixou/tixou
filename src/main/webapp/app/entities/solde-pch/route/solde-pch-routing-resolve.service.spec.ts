jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISoldePch, SoldePch } from '../solde-pch.model';
import { SoldePchService } from '../service/solde-pch.service';

import { SoldePchRoutingResolveService } from './solde-pch-routing-resolve.service';

describe('SoldePch routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SoldePchRoutingResolveService;
  let service: SoldePchService;
  let resultSoldePch: ISoldePch | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(SoldePchRoutingResolveService);
    service = TestBed.inject(SoldePchService);
    resultSoldePch = undefined;
  });

  describe('resolve', () => {
    it('should return ISoldePch returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSoldePch = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSoldePch).toEqual({ id: 123 });
    });

    it('should return new ISoldePch if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSoldePch = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSoldePch).toEqual(new SoldePch());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as SoldePch })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSoldePch = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSoldePch).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
