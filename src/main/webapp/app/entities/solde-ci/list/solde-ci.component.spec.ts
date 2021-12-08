import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SoldeCiService } from '../service/solde-ci.service';

import { SoldeCiComponent } from './solde-ci.component';

describe('SoldeCi Management Component', () => {
  let comp: SoldeCiComponent;
  let fixture: ComponentFixture<SoldeCiComponent>;
  let service: SoldeCiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SoldeCiComponent],
    })
      .overrideTemplate(SoldeCiComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SoldeCiComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SoldeCiService);

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
    expect(comp.soldeCis?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
