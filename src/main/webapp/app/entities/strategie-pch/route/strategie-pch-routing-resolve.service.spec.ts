jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IStrategiePch, StrategiePch } from '../strategie-pch.model';
import { StrategiePchService } from '../service/strategie-pch.service';

import { StrategiePchRoutingResolveService } from './strategie-pch-routing-resolve.service';

describe('StrategiePch routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: StrategiePchRoutingResolveService;
  let service: StrategiePchService;
  let resultStrategiePch: IStrategiePch | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(StrategiePchRoutingResolveService);
    service = TestBed.inject(StrategiePchService);
    resultStrategiePch = undefined;
  });

  describe('resolve', () => {
    it('should return IStrategiePch returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStrategiePch = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStrategiePch).toEqual({ id: 123 });
    });

    it('should return new IStrategiePch if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStrategiePch = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultStrategiePch).toEqual(new StrategiePch());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as StrategiePch })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStrategiePch = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStrategiePch).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
