import { IReponse } from 'app/entities/reponse/reponse.model';
import { TypeDestination } from 'app/entities/enumerations/type-destination.model';

export interface IImpact {
  id?: number;
  designation?: string | null;
  explication?: string | null;
  typeImpact?: TypeDestination | null;
  reponse?: IReponse | null;
}

export class Impact implements IImpact {
  constructor(
    public id?: number,
    public designation?: string | null,
    public explication?: string | null,
    public typeImpact?: TypeDestination | null,
    public reponse?: IReponse | null
  ) {}
}

export function getImpactIdentifier(impact: IImpact): number | undefined {
  return impact.id;
}
