import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StrategiePchEDetailComponent } from './strategie-pch-e-detail.component';

describe('StrategiePchE Management Detail Component', () => {
  let comp: StrategiePchEDetailComponent;
  let fixture: ComponentFixture<StrategiePchEDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrategiePchEDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ strategiePchE: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StrategiePchEDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StrategiePchEDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load strategiePchE on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.strategiePchE).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
