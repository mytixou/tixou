import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { NatureActiviteService } from '../service/nature-activite.service';

import { NatureActiviteComponent } from './nature-activite.component';

describe('NatureActivite Management Component', () => {
  let comp: NatureActiviteComponent;
  let fixture: ComponentFixture<NatureActiviteComponent>;
  let service: NatureActiviteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NatureActiviteComponent],
    })
      .overrideTemplate(NatureActiviteComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NatureActiviteComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(NatureActiviteService);

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
    expect(comp.natureActivites?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
