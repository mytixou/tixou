import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TiersFinanceurService } from '../service/tiers-financeur.service';

import { TiersFinanceurComponent } from './tiers-financeur.component';

describe('TiersFinanceur Management Component', () => {
  let comp: TiersFinanceurComponent;
  let fixture: ComponentFixture<TiersFinanceurComponent>;
  let service: TiersFinanceurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TiersFinanceurComponent],
    })
      .overrideTemplate(TiersFinanceurComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TiersFinanceurComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TiersFinanceurService);

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
    expect(comp.tiersFinanceurs?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
