import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CommanditaireService } from '../service/commanditaire.service';

import { CommanditaireComponent } from './commanditaire.component';

describe('Commanditaire Management Component', () => {
  let comp: CommanditaireComponent;
  let fixture: ComponentFixture<CommanditaireComponent>;
  let service: CommanditaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CommanditaireComponent],
    })
      .overrideTemplate(CommanditaireComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CommanditaireComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CommanditaireService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.commanditaires?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
