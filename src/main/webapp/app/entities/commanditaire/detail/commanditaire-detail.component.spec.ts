import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CommanditaireDetailComponent } from './commanditaire-detail.component';

describe('Commanditaire Management Detail Component', () => {
  let comp: CommanditaireDetailComponent;
  let fixture: ComponentFixture<CommanditaireDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommanditaireDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ commanditaire: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CommanditaireDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CommanditaireDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load commanditaire on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.commanditaire).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
