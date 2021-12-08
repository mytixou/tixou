jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IConsommationCi, ConsommationCi } from '../consommation-ci.model';
import { ConsommationCiService } from '../service/consommation-ci.service';

import { ConsommationCiRoutingResolveService } from './consommation-ci-routing-resolve.service';

describe('ConsommationCi routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ConsommationCiRoutingResolveService;
  let service: ConsommationCiService;
  let resultConsommationCi: IConsommationCi | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(ConsommationCiRoutingResolveService);
    service = TestBed.inject(ConsommationCiService);
    resultConsommationCi = undefined;
  });

  describe('resolve', () => {
    it('should return IConsommationCi returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConsommationCi = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultConsommationCi).toEqual({ id: 123 });
    });

    it('should return new IConsommationCi if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConsommationCi = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultConsommationCi).toEqual(new ConsommationCi());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ConsommationCi })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConsommationCi = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultConsommationCi).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
