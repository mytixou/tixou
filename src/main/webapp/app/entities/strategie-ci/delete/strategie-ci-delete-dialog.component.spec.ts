jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { StrategieCiService } from '../service/strategie-ci.service';

import { StrategieCiDeleteDialogComponent } from './strategie-ci-delete-dialog.component';

describe('StrategieCi Management Delete Component', () => {
  let comp: StrategieCiDeleteDialogComponent;
  let fixture: ComponentFixture<StrategieCiDeleteDialogComponent>;
  let service: StrategieCiService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StrategieCiDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(StrategieCiDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StrategieCiDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StrategieCiService);
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
