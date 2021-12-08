jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IConsommationPchE, ConsommationPchE } from '../consommation-pch-e.model';
import { ConsommationPchEService } from '../service/consommation-pch-e.service';

import { ConsommationPchERoutingResolveService } from './consommation-pch-e-routing-resolve.service';

describe('ConsommationPchE routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ConsommationPchERoutingResolveService;
  let service: ConsommationPchEService;
  let resultConsommationPchE: IConsommationPchE | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(ConsommationPchERoutingResolveService);
    service = TestBed.inject(ConsommationPchEService);
    resultConsommationPchE = undefined;
  });

  describe('resolve', () => {
    it('should return IConsommationPchE returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConsommationPchE = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultConsommationPchE).toEqual({ id: 123 });
    });

    it('should return new IConsommationPchE if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConsommationPchE = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultConsommationPchE).toEqual(new ConsommationPchE());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ConsommationPchE })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConsommationPchE = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultConsommationPchE).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
