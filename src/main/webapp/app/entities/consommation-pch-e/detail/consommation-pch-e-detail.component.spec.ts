import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConsommationPchEDetailComponent } from './consommation-pch-e-detail.component';

describe('ConsommationPchE Management Detail Component', () => {
  let comp: ConsommationPchEDetailComponent;
  let fixture: ComponentFixture<ConsommationPchEDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsommationPchEDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ consommationPchE: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ConsommationPchEDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ConsommationPchEDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load consommationPchE on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.consommationPchE).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
