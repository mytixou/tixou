import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StrategieApaDetailComponent } from './strategie-apa-detail.component';

describe('StrategieApa Management Detail Component', () => {
  let comp: StrategieApaDetailComponent;
  let fixture: ComponentFixture<StrategieApaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrategieApaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ strategieApa: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StrategieApaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StrategieApaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load strategieApa on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.strategieApa).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
