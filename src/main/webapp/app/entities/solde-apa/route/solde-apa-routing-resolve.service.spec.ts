jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISoldeApa, SoldeApa } from '../solde-apa.model';
import { SoldeApaService } from '../service/solde-apa.service';

import { SoldeApaRoutingResolveService } from './solde-apa-routing-resolve.service';

describe('SoldeApa routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SoldeApaRoutingResolveService;
  let service: SoldeApaService;
  let resultSoldeApa: ISoldeApa | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(SoldeApaRoutingResolveService);
    service = TestBed.inject(SoldeApaService);
    resultSoldeApa = undefined;
  });

  describe('resolve', () => {
    it('should return ISoldeApa returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSoldeApa = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSoldeApa).toEqual({ id: 123 });
    });

    it('should return new ISoldeApa if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSoldeApa = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSoldeApa).toEqual(new SoldeApa());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as SoldeApa })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSoldeApa = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSoldeApa).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
