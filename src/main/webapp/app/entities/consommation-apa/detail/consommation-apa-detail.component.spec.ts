import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConsommationApaDetailComponent } from './consommation-apa-detail.component';

describe('ConsommationApa Management Detail Component', () => {
  let comp: ConsommationApaDetailComponent;
  let fixture: ComponentFixture<ConsommationApaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsommationApaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ consommationApa: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ConsommationApaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ConsommationApaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load consommationApa on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.consommationApa).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
