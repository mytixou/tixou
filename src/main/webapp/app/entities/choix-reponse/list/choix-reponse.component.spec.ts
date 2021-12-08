import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ChoixReponseService } from '../service/choix-reponse.service';

import { ChoixReponseComponent } from './choix-reponse.component';

describe('ChoixReponse Management Component', () => {
  let comp: ChoixReponseComponent;
  let fixture: ComponentFixture<ChoixReponseComponent>;
  let service: ChoixReponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChoixReponseComponent],
    })
      .overrideTemplate(ChoixReponseComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChoixReponseComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ChoixReponseService);

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
    expect(comp.choixReponses?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
