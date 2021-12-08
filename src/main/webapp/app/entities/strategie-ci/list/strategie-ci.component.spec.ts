import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { StrategieCiService } from '../service/strategie-ci.service';

import { StrategieCiComponent } from './strategie-ci.component';

describe('StrategieCi Management Component', () => {
  let comp: StrategieCiComponent;
  let fixture: ComponentFixture<StrategieCiComponent>;
  let service: StrategieCiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StrategieCiComponent],
    })
      .overrideTemplate(StrategieCiComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StrategieCiComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StrategieCiService);

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
    expect(comp.strategieCis?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
