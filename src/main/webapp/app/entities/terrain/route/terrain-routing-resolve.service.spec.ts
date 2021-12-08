jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITerrain, Terrain } from '../terrain.model';
import { TerrainService } from '../service/terrain.service';

import { TerrainRoutingResolveService } from './terrain-routing-resolve.service';

describe('Terrain routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TerrainRoutingResolveService;
  let service: TerrainService;
  let resultTerrain: ITerrain | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(TerrainRoutingResolveService);
    service = TestBed.inject(TerrainService);
    resultTerrain = undefined;
  });

  describe('resolve', () => {
    it('should return ITerrain returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTerrain = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTerrain).toEqual({ id: 123 });
    });

    it('should return new ITerrain if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTerrain = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTerrain).toEqual(new Terrain());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Terrain })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTerrain = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTerrain).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
