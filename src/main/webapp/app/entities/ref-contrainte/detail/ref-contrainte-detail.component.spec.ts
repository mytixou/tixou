import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RefContrainteDetailComponent } from './ref-contrainte-detail.component';

describe('RefContrainte Management Detail Component', () => {
  let comp: RefContrainteDetailComponent;
  let fixture: ComponentFixture<RefContrainteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefContrainteDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ refContrainte: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RefContrainteDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RefContrainteDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load refContrainte on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.refContrainte).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
