import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NatureActiviteDetailComponent } from './nature-activite-detail.component';

describe('NatureActivite Management Detail Component', () => {
  let comp: NatureActiviteDetailComponent;
  let fixture: ComponentFixture<NatureActiviteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NatureActiviteDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ natureActivite: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(NatureActiviteDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NatureActiviteDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load natureActivite on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.natureActivite).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
