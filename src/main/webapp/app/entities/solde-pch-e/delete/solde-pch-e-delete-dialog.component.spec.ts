jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SoldePchEService } from '../service/solde-pch-e.service';

import { SoldePchEDeleteDialogComponent } from './solde-pch-e-delete-dialog.component';

describe('SoldePchE Management Delete Component', () => {
  let comp: SoldePchEDeleteDialogComponent;
  let fixture: ComponentFixture<SoldePchEDeleteDialogComponent>;
  let service: SoldePchEService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SoldePchEDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(SoldePchEDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SoldePchEDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SoldePchEService);
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
