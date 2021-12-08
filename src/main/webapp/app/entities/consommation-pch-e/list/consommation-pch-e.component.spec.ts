import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ConsommationPchEService } from '../service/consommation-pch-e.service';

import { ConsommationPchEComponent } from './consommation-pch-e.component';

describe('ConsommationPchE Management Component', () => {
  let comp: ConsommationPchEComponent;
  let fixture: ComponentFixture<ConsommationPchEComponent>;
  let service: ConsommationPchEService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ConsommationPchEComponent],
    })
      .overrideTemplate(ConsommationPchEComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsommationPchEComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ConsommationPchEService);

    const headers = new HttpHeaders();
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
    expect(comp.consommationPchES?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
