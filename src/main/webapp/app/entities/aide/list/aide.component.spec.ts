import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AideService } from '../service/aide.service';

import { AideComponent } from './aide.component';

describe('Aide Management Component', () => {
  let comp: AideComponent;
  let fixture: ComponentFixture<AideComponent>;
  let service: AideService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AideComponent],
    })
      .overrideTemplate(AideComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AideComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AideService);

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
    expect(comp.aides?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
