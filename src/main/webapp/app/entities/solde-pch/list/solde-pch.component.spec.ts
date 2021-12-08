import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SoldePchService } from '../service/solde-pch.service';

import { SoldePchComponent } from './solde-pch.component';

describe('SoldePch Management Component', () => {
  let comp: SoldePchComponent;
  let fixture: ComponentFixture<SoldePchComponent>;
  let service: SoldePchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SoldePchComponent],
    })
      .overrideTemplate(SoldePchComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SoldePchComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SoldePchService);

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
    expect(comp.soldePches?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
