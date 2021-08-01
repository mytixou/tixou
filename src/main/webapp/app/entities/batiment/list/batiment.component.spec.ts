import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { BatimentService } from '../service/batiment.service';

import { BatimentComponent } from './batiment.component';

describe('Component Tests', () => {
  describe('Batiment Management Component', () => {
    let comp: BatimentComponent;
    let fixture: ComponentFixture<BatimentComponent>;
    let service: BatimentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [BatimentComponent],
      })
        .overrideTemplate(BatimentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BatimentComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(BatimentService);

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
      expect(comp.batiments?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
