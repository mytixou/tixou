import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ConsommationApaService } from '../service/consommation-apa.service';

import { ConsommationApaComponent } from './consommation-apa.component';

describe('ConsommationApa Management Component', () => {
  let comp: ConsommationApaComponent;
  let fixture: ComponentFixture<ConsommationApaComponent>;
  let service: ConsommationApaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ConsommationApaComponent],
    })
      .overrideTemplate(ConsommationApaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsommationApaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ConsommationApaService);

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
    expect(comp.consommationApas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
