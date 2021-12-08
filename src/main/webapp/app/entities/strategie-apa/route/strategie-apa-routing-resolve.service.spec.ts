jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IStrategieApa, StrategieApa } from '../strategie-apa.model';
import { StrategieApaService } from '../service/strategie-apa.service';

import { StrategieApaRoutingResolveService } from './strategie-apa-routing-resolve.service';

describe('StrategieApa routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: StrategieApaRoutingResolveService;
  let service: StrategieApaService;
  let resultStrategieApa: IStrategieApa | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(StrategieApaRoutingResolveService);
    service = TestBed.inject(StrategieApaService);
    resultStrategieApa = undefined;
  });

  describe('resolve', () => {
    it('should return IStrategieApa returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStrategieApa = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStrategieApa).toEqual({ id: 123 });
    });

    it('should return new IStrategieApa if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStrategieApa = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultStrategieApa).toEqual(new StrategieApa());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as StrategieApa })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStrategieApa = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStrategieApa).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
