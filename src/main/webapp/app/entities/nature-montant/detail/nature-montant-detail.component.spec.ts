import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NatureMontantDetailComponent } from './nature-montant-detail.component';

describe('NatureMontant Management Detail Component', () => {
  let comp: NatureMontantDetailComponent;
  let fixture: ComponentFixture<NatureMontantDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NatureMontantDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ natureMontant: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(NatureMontantDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NatureMontantDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load natureMontant on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.natureMontant).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
