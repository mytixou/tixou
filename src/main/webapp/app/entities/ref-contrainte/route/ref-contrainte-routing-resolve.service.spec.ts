jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IRefContrainte, RefContrainte } from '../ref-contrainte.model';
import { RefContrainteService } from '../service/ref-contrainte.service';

import { RefContrainteRoutingResolveService } from './ref-contrainte-routing-resolve.service';

describe('RefContrainte routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: RefContrainteRoutingResolveService;
  let service: RefContrainteService;
  let resultRefContrainte: IRefContrainte | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(RefContrainteRoutingResolveService);
    service = TestBed.inject(RefContrainteService);
    resultRefContrainte = undefined;
  });

  describe('resolve', () => {
    it('should return IRefContrainte returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRefContrainte = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRefContrainte).toEqual({ id: 123 });
    });

    it('should return new IRefContrainte if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRefContrainte = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultRefContrainte).toEqual(new RefContrainte());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as RefContrainte })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRefContrainte = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRefContrainte).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
