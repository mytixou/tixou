jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISoldeCi, SoldeCi } from '../solde-ci.model';
import { SoldeCiService } from '../service/solde-ci.service';

import { SoldeCiRoutingResolveService } from './solde-ci-routing-resolve.service';

describe('SoldeCi routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SoldeCiRoutingResolveService;
  let service: SoldeCiService;
  let resultSoldeCi: ISoldeCi | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(SoldeCiRoutingResolveService);
    service = TestBed.inject(SoldeCiService);
    resultSoldeCi = undefined;
  });

  describe('resolve', () => {
    it('should return ISoldeCi returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSoldeCi = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSoldeCi).toEqual({ id: 123 });
    });

    it('should return new ISoldeCi if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSoldeCi = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSoldeCi).toEqual(new SoldeCi());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as SoldeCi })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSoldeCi = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSoldeCi).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
