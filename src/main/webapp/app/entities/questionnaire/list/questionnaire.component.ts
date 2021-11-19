import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuestionnaire } from '../questionnaire.model';
import { QuestionnaireService } from '../service/questionnaire.service';
import { QuestionnaireDeleteDialogComponent } from '../delete/questionnaire-delete-dialog.component';

@Component({
  selector: 'jhi-questionnaire',
  templateUrl: './questionnaire.component.html',
})
export class QuestionnaireComponent implements OnInit {
  questionnaires?: IQuestionnaire[];
  isLoading = false;

  constructor(protected questionnaireService: QuestionnaireService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.questionnaireService.query().subscribe(
      (res: HttpResponse<IQuestionnaire[]>) => {
        this.isLoading = false;
        this.questionnaires = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IQuestionnaire): number {
    return item.id!;
  }

  delete(questionnaire: IQuestionnaire): void {
    const modalRef = this.modalService.open(QuestionnaireDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.questionnaire = questionnaire;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
