import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldeCiDetailComponent } from './solde-ci-detail.component';

describe('SoldeCi Management Detail Component', () => {
  let comp: SoldeCiDetailComponent;
  let fixture: ComponentFixture<SoldeCiDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoldeCiDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ soldeCi: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SoldeCiDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SoldeCiDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load soldeCi on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.soldeCi).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
