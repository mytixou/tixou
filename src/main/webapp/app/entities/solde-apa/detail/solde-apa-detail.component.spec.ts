import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldeApaDetailComponent } from './solde-apa-detail.component';

describe('SoldeApa Management Detail Component', () => {
  let comp: SoldeApaDetailComponent;
  let fixture: ComponentFixture<SoldeApaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoldeApaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ soldeApa: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SoldeApaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SoldeApaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load soldeApa on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.soldeApa).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
