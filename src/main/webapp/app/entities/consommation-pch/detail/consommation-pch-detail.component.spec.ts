import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConsommationPchDetailComponent } from './consommation-pch-detail.component';

describe('ConsommationPch Management Detail Component', () => {
  let comp: ConsommationPchDetailComponent;
  let fixture: ComponentFixture<ConsommationPchDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsommationPchDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ consommationPch: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ConsommationPchDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ConsommationPchDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load consommationPch on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.consommationPch).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
