import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ConsommationPchService } from '../service/consommation-pch.service';

import { ConsommationPchComponent } from './consommation-pch.component';

describe('ConsommationPch Management Component', () => {
  let comp: ConsommationPchComponent;
  let fixture: ComponentFixture<ConsommationPchComponent>;
  let service: ConsommationPchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ConsommationPchComponent],
    })
      .overrideTemplate(ConsommationPchComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsommationPchComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ConsommationPchService);

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
    expect(comp.consommationPches?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
