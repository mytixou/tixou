import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { StrategieApaService } from '../service/strategie-apa.service';

import { StrategieApaComponent } from './strategie-apa.component';

describe('StrategieApa Management Component', () => {
  let comp: StrategieApaComponent;
  let fixture: ComponentFixture<StrategieApaComponent>;
  let service: StrategieApaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StrategieApaComponent],
    })
      .overrideTemplate(StrategieApaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StrategieApaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StrategieApaService);

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
    expect(comp.strategieApas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
