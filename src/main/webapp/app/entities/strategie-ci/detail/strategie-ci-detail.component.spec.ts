import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StrategieCiDetailComponent } from './strategie-ci-detail.component';

describe('StrategieCi Management Detail Component', () => {
  let comp: StrategieCiDetailComponent;
  let fixture: ComponentFixture<StrategieCiDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrategieCiDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ strategieCi: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StrategieCiDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StrategieCiDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load strategieCi on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.strategieCi).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
