import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConsommationCiDetailComponent } from './consommation-ci-detail.component';

describe('ConsommationCi Management Detail Component', () => {
  let comp: ConsommationCiDetailComponent;
  let fixture: ComponentFixture<ConsommationCiDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsommationCiDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ consommationCi: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ConsommationCiDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ConsommationCiDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load consommationCi on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.consommationCi).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
