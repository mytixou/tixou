jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ChoixReponseService } from '../service/choix-reponse.service';

import { ChoixReponseDeleteDialogComponent } from './choix-reponse-delete-dialog.component';

describe('ChoixReponse Management Delete Component', () => {
  let comp: ChoixReponseDeleteDialogComponent;
  let fixture: ComponentFixture<ChoixReponseDeleteDialogComponent>;
  let service: ChoixReponseService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChoixReponseDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(ChoixReponseDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ChoixReponseDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ChoixReponseService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({})));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
