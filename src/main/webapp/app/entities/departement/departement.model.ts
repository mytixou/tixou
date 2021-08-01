import { IRegion } from 'app/entities/region/region.model';

export interface IDepartement {
  id?: number;
  nom?: string | null;
  code?: number | null;
  region?: IRegion | null;
}

export class Departement implements IDepartement {
  constructor(public id?: number, public nom?: string | null, public code?: number | null, public region?: IRegion | null) {}
}

export function getDepartementIdentifier(departement: IDepartement): number | undefined {
  return departement.id;
}
