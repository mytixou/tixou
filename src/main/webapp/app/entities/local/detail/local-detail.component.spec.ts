import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LocalDetailComponent } from './local-detail.component';

describe('Component Tests', () => {
  describe('Local Management Detail Component', () => {
    let comp: LocalDetailComponent;
    let fixture: ComponentFixture<LocalDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [LocalDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ local: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(LocalDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load local on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.local).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
