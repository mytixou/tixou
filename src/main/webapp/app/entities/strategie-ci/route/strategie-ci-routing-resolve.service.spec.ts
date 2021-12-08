jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IStrategieCi, StrategieCi } from '../strategie-ci.model';
import { StrategieCiService } from '../service/strategie-ci.service';

import { StrategieCiRoutingResolveService } from './strategie-ci-routing-resolve.service';

describe('StrategieCi routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: StrategieCiRoutingResolveService;
  let service: StrategieCiService;
  let resultStrategieCi: IStrategieCi | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(StrategieCiRoutingResolveService);
    service = TestBed.inject(StrategieCiService);
    resultStrategieCi = undefined;
  });

  describe('resolve', () => {
    it('should return IStrategieCi returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStrategieCi = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStrategieCi).toEqual({ id: 123 });
    });

    it('should return new IStrategieCi if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStrategieCi = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultStrategieCi).toEqual(new StrategieCi());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as StrategieCi })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStrategieCi = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStrategieCi).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
