import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChoixReponseDetailComponent } from './choix-reponse-detail.component';

describe('ChoixReponse Management Detail Component', () => {
  let comp: ChoixReponseDetailComponent;
  let fixture: ComponentFixture<ChoixReponseDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoixReponseDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ choixReponse: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ChoixReponseDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ChoixReponseDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load choixReponse on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.choixReponse).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
