import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TiersFinanceurDetailComponent } from './tiers-financeur-detail.component';

describe('TiersFinanceur Management Detail Component', () => {
  let comp: TiersFinanceurDetailComponent;
  let fixture: ComponentFixture<TiersFinanceurDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiersFinanceurDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tiersFinanceur: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TiersFinanceurDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TiersFinanceurDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tiersFinanceur on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tiersFinanceur).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
