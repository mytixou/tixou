import { IDossier } from 'app/entities/dossier/dossier.model';
import { IQuestion } from 'app/entities/question/question.model';
import { TypeDestination } from 'app/entities/enumerations/type-destination.model';

export interface IQuestionnaire {
  id?: number;
  designation?: string | null;
  explication?: string | null;
  typeQuestionnaire?: TypeDestination | null;
  dossier?: IDossier | null;
  questions?: IQuestion[] | null;
}

export class Questionnaire implements IQuestionnaire {
  constructor(
    public id?: number,
    public designation?: string | null,
    public explication?: string | null,
    public typeQuestionnaire?: TypeDestination | null,
    public dossier?: IDossier | null,
    public questions?: IQuestion[] | null
  ) {}
}

export function getQuestionnaireIdentifier(questionnaire: IQuestionnaire): number | undefined {
  return questionnaire.id;
}
