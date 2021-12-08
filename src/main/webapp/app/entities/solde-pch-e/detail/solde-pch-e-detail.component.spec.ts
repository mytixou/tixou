import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldePchEDetailComponent } from './solde-pch-e-detail.component';

describe('SoldePchE Management Detail Component', () => {
  let comp: SoldePchEDetailComponent;
  let fixture: ComponentFixture<SoldePchEDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoldePchEDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ soldePchE: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SoldePchEDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SoldePchEDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load soldePchE on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.soldePchE).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
