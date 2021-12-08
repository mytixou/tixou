jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IStrategiePchE, StrategiePchE } from '../strategie-pch-e.model';
import { StrategiePchEService } from '../service/strategie-pch-e.service';

import { StrategiePchERoutingResolveService } from './strategie-pch-e-routing-resolve.service';

describe('StrategiePchE routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: StrategiePchERoutingResolveService;
  let service: StrategiePchEService;
  let resultStrategiePchE: IStrategiePchE | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(StrategiePchERoutingResolveService);
    service = TestBed.inject(StrategiePchEService);
    resultStrategiePchE = undefined;
  });

  describe('resolve', () => {
    it('should return IStrategiePchE returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStrategiePchE = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStrategiePchE).toEqual({ id: 123 });
    });

    it('should return new IStrategiePchE if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStrategiePchE = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultStrategiePchE).toEqual(new StrategiePchE());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as StrategiePchE })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStrategiePchE = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStrategiePchE).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
