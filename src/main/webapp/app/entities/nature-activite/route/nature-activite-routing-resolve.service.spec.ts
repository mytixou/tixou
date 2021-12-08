jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { INatureActivite, NatureActivite } from '../nature-activite.model';
import { NatureActiviteService } from '../service/nature-activite.service';

import { NatureActiviteRoutingResolveService } from './nature-activite-routing-resolve.service';

describe('NatureActivite routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: NatureActiviteRoutingResolveService;
  let service: NatureActiviteService;
  let resultNatureActivite: INatureActivite | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(NatureActiviteRoutingResolveService);
    service = TestBed.inject(NatureActiviteService);
    resultNatureActivite = undefined;
  });

  describe('resolve', () => {
    it('should return INatureActivite returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNatureActivite = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultNatureActivite).toEqual({ id: 123 });
    });

    it('should return new INatureActivite if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNatureActivite = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultNatureActivite).toEqual(new NatureActivite());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as NatureActivite })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNatureActivite = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultNatureActivite).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
