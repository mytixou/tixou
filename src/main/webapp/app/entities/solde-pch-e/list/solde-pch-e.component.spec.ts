import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SoldePchEService } from '../service/solde-pch-e.service';

import { SoldePchEComponent } from './solde-pch-e.component';

describe('SoldePchE Management Component', () => {
  let comp: SoldePchEComponent;
  let fixture: ComponentFixture<SoldePchEComponent>;
  let service: SoldePchEService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SoldePchEComponent],
    })
      .overrideTemplate(SoldePchEComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SoldePchEComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SoldePchEService);

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
    expect(comp.soldePchES?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
