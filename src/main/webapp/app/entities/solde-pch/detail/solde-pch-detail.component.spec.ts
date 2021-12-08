import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldePchDetailComponent } from './solde-pch-detail.component';

describe('SoldePch Management Detail Component', () => {
  let comp: SoldePchDetailComponent;
  let fixture: ComponentFixture<SoldePchDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoldePchDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ soldePch: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SoldePchDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SoldePchDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load soldePch on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.soldePch).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
