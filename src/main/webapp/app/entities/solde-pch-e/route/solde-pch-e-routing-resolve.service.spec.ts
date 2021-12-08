jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISoldePchE, SoldePchE } from '../solde-pch-e.model';
import { SoldePchEService } from '../service/solde-pch-e.service';

import { SoldePchERoutingResolveService } from './solde-pch-e-routing-resolve.service';

describe('SoldePchE routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SoldePchERoutingResolveService;
  let service: SoldePchEService;
  let resultSoldePchE: ISoldePchE | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(SoldePchERoutingResolveService);
    service = TestBed.inject(SoldePchEService);
    resultSoldePchE = undefined;
  });

  describe('resolve', () => {
    it('should return ISoldePchE returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSoldePchE = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSoldePchE).toEqual({ id: 123 });
    });

    it('should return new ISoldePchE if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSoldePchE = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSoldePchE).toEqual(new SoldePchE());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as SoldePchE })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSoldePchE = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSoldePchE).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
