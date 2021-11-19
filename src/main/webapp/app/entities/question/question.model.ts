import { IQuestionnaire } from 'app/entities/questionnaire/questionnaire.model';
import { TypeDestination } from 'app/entities/enumerations/type-destination.model';

export interface IQuestion {
  id?: number;
  designation?: string | null;
  explication?: string | null;
  typeQuestion?: TypeDestination | null;
  questionnaires?: IQuestionnaire[] | null;
}

export class Question implements IQuestion {
  constructor(
    public id?: number,
    public designation?: string | null,
    public explication?: string | null,
    public typeQuestion?: TypeDestination | null,
    public questionnaires?: IQuestionnaire[] | null
  ) {}
}

export function getQuestionIdentifier(question: IQuestion): number | undefined {
  return question.id;
}
