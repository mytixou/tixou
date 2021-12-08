import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ImpactService } from '../service/impact.service';

import { ImpactComponent } from './impact.component';

describe('Impact Management Component', () => {
  let comp: ImpactComponent;
  let fixture: ComponentFixture<ImpactComponent>;
  let service: ImpactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ImpactComponent],
    })
      .overrideTemplate(ImpactComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ImpactComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ImpactService);

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
    expect(comp.impacts?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
