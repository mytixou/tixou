import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { NatureMontantService } from '../service/nature-montant.service';

import { NatureMontantComponent } from './nature-montant.component';

describe('NatureMontant Management Component', () => {
  let comp: NatureMontantComponent;
  let fixture: ComponentFixture<NatureMontantComponent>;
  let service: NatureMontantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NatureMontantComponent],
    })
      .overrideTemplate(NatureMontantComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NatureMontantComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(NatureMontantService);

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
    expect(comp.natureMontants?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
