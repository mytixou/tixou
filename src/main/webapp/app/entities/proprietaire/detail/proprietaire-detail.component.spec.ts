import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProprietaireDetailComponent } from './proprietaire-detail.component';

describe('Component Tests', () => {
  describe('Proprietaire Management Detail Component', () => {
    let comp: ProprietaireDetailComponent;
    let fixture: ComponentFixture<ProprietaireDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProprietaireDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ proprietaire: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ProprietaireDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProprietaireDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load proprietaire on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.proprietaire).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
