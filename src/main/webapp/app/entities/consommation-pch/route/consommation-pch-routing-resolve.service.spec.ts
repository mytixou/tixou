jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IConsommationPch, ConsommationPch } from '../consommation-pch.model';
import { ConsommationPchService } from '../service/consommation-pch.service';

import { ConsommationPchRoutingResolveService } from './consommation-pch-routing-resolve.service';

describe('ConsommationPch routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ConsommationPchRoutingResolveService;
  let service: ConsommationPchService;
  let resultConsommationPch: IConsommationPch | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(ConsommationPchRoutingResolveService);
    service = TestBed.inject(ConsommationPchService);
    resultConsommationPch = undefined;
  });

  describe('resolve', () => {
    it('should return IConsommationPch returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConsommationPch = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultConsommationPch).toEqual({ id: 123 });
    });

    it('should return new IConsommationPch if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConsommationPch = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultConsommationPch).toEqual(new ConsommationPch());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ConsommationPch })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConsommationPch = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultConsommationPch).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
