import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StrategiePchDetailComponent } from './strategie-pch-detail.component';

describe('StrategiePch Management Detail Component', () => {
  let comp: StrategiePchDetailComponent;
  let fixture: ComponentFixture<StrategiePchDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrategiePchDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ strategiePch: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StrategiePchDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StrategiePchDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load strategiePch on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.strategiePch).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
