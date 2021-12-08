import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ImpactDetailComponent } from './impact-detail.component';

describe('Impact Management Detail Component', () => {
  let comp: ImpactDetailComponent;
  let fixture: ComponentFixture<ImpactDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpactDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ impact: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ImpactDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ImpactDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load impact on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.impact).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
