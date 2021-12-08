import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { QuestionnaireService } from '../service/questionnaire.service';

import { QuestionnaireComponent } from './questionnaire.component';

describe('Questionnaire Management Component', () => {
  let comp: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;
  let service: QuestionnaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [QuestionnaireComponent],
    })
      .overrideTemplate(QuestionnaireComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuestionnaireComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(QuestionnaireService);

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
    expect(comp.questionnaires?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
