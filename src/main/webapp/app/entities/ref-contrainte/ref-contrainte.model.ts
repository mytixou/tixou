import { TypeContrainte } from 'app/entities/enumerations/type-contrainte.model';
import { TypeDestination } from 'app/entities/enumerations/type-destination.model';

export interface IRefContrainte {
  id?: number;
  designation?: string | null;
  typeContrainte?: TypeContrainte | null;
  typeDestination?: TypeDestination | null;
  explication?: string | null;
}

export class RefContrainte implements IRefContrainte {
  constructor(
    public id?: number,
    public designation?: string | null,
    public typeContrainte?: TypeContrainte | null,
    public typeDestination?: TypeDestination | null,
    public explication?: string | null
  ) {}
}

export function getRefContrainteIdentifier(refContrainte: IRefContrainte): number | undefined {
  return refContrainte.id;
}
