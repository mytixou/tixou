import { IBatiment } from 'app/entities/batiment/batiment.model';
import { IProprietaire } from 'app/entities/proprietaire/proprietaire.model';
import { TypeLocal } from 'app/entities/enumerations/type-local.model';

export interface ILocal {
  id?: number;
  designation?: string | null;
  surface?: number | null;
  etage?: number | null;
  typelocal?: TypeLocal | null;
  batiment?: IBatiment | null;
  proprietaires?: IProprietaire[] | null;
}

export class Local implements ILocal {
  constructor(
    public id?: number,
    public designation?: string | null,
    public surface?: number | null,
    public etage?: number | null,
    public typelocal?: TypeLocal | null,
    public batiment?: IBatiment | null,
    public proprietaires?: IProprietaire[] | null
  ) {}
}

export function getLocalIdentifier(local: ILocal): number | undefined {
  return local.id;
}
