import { IDepartement } from 'app/entities/departement/departement.model';

export interface IAdresse {
  id?: number;
  adresseLigne1?: string | null;
  adresseLigne2?: string | null;
  codePostal?: string | null;
  ville?: string | null;
  stateProvince?: string | null;
  departement?: IDepartement | null;
}

export class Adresse implements IAdresse {
  constructor(
    public id?: number,
    public adresseLigne1?: string | null,
    public adresseLigne2?: string | null,
    public codePostal?: string | null,
    public ville?: string | null,
    public stateProvince?: string | null,
    public departement?: IDepartement | null
  ) {}
}

export function getAdresseIdentifier(adresse: IAdresse): number | undefined {
  return adresse.id;
}
