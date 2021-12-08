jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IImpact, Impact } from '../impact.model';
import { ImpactService } from '../service/impact.service';

import { ImpactRoutingResolveService } from './impact-routing-resolve.service';

describe('Impact routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ImpactRoutingResolveService;
  let service: ImpactService;
  let resultImpact: IImpact | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(ImpactRoutingResolveService);
    service = TestBed.inject(ImpactService);
    resultImpact = undefined;
  });

  describe('resolve', () => {
    it('should return IImpact returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultImpact = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultImpact).toEqual({ id: 123 });
    });

    it('should return new IImpact if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultImpact = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultImpact).toEqual(new Impact());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Impact })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultImpact = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultImpact).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
