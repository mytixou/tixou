import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { StrategiePchService } from '../service/strategie-pch.service';

import { StrategiePchComponent } from './strategie-pch.component';

describe('StrategiePch Management Component', () => {
  let comp: StrategiePchComponent;
  let fixture: ComponentFixture<StrategiePchComponent>;
  let service: StrategiePchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StrategiePchComponent],
    })
      .overrideTemplate(StrategiePchComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StrategiePchComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StrategiePchService);

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
    expect(comp.strategiePches?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
