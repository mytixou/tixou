import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SoldeApaService } from '../service/solde-apa.service';

import { SoldeApaComponent } from './solde-apa.component';

describe('SoldeApa Management Component', () => {
  let comp: SoldeApaComponent;
  let fixture: ComponentFixture<SoldeApaComponent>;
  let service: SoldeApaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SoldeApaComponent],
    })
      .overrideTemplate(SoldeApaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SoldeApaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SoldeApaService);

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
    expect(comp.soldeApas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
