jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IChoixReponse, ChoixReponse } from '../choix-reponse.model';
import { ChoixReponseService } from '../service/choix-reponse.service';

import { ChoixReponseRoutingResolveService } from './choix-reponse-routing-resolve.service';

describe('Service Tests', () => {
  describe('ChoixReponse routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ChoixReponseRoutingResolveService;
    let service: ChoixReponseService;
    let resultChoixReponse: IChoixReponse | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ChoixReponseRoutingResolveService);
      service = TestBed.inject(ChoixReponseService);
      resultChoixReponse = undefined;
    });

    describe('resolve', () => {
      it('should return IChoixReponse returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultChoixReponse = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultChoixReponse).toEqual({ id: 123 });
      });

      it('should return new IChoixReponse if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultChoixReponse = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultChoixReponse).toEqual(new ChoixReponse());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ChoixReponse })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultChoixReponse = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultChoixReponse).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
