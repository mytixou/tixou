import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RefContrainteService } from '../service/ref-contrainte.service';

import { RefContrainteComponent } from './ref-contrainte.component';

describe('RefContrainte Management Component', () => {
  let comp: RefContrainteComponent;
  let fixture: ComponentFixture<RefContrainteComponent>;
  let service: RefContrainteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RefContrainteComponent],
    })
      .overrideTemplate(RefContrainteComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RefContrainteComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RefContrainteService);

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
    expect(comp.refContraintes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
