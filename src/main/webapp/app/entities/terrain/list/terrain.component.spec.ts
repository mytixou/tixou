import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TerrainService } from '../service/terrain.service';

import { TerrainComponent } from './terrain.component';

describe('Component Tests', () => {
  describe('Terrain Management Component', () => {
    let comp: TerrainComponent;
    let fixture: ComponentFixture<TerrainComponent>;
    let service: TerrainService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TerrainComponent],
      })
        .overrideTemplate(TerrainComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TerrainComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TerrainService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.terrains?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
