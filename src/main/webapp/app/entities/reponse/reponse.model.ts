import { IQuestion } from 'app/entities/question/question.model';
import { TypeDestination } from 'app/entities/enumerations/type-destination.model';

export interface IReponse {
  id?: number;
  designation?: string | null;
  explication?: string | null;
  typeQuestion?: TypeDestination | null;
  question?: IQuestion | null;
}

export class Reponse implements IReponse {
  constructor(
    public id?: number,
    public designation?: string | null,
    public explication?: string | null,
    public typeQuestion?: TypeDestination | null,
    public question?: IQuestion | null
  ) {}
}

export function getReponseIdentifier(reponse: IReponse): number | undefined {
  return reponse.id;
}
