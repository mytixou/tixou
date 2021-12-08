import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AideDetailComponent } from './aide-detail.component';

describe('Aide Management Detail Component', () => {
  let comp: AideDetailComponent;
  let fixture: ComponentFixture<AideDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AideDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ aide: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AideDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AideDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load aide on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.aide).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
