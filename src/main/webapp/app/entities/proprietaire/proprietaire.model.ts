import * as dayjs from 'dayjs';
import { ILocal } from 'app/entities/local/local.model';

export interface IProprietaire {
  id?: number;
  prenom?: string | null;
  nom?: string | null;
  email?: string | null;
  telephoneFixe?: string | null;
  telephonePortable?: string | null;
  depuis?: dayjs.Dayjs | null;
  habiteLocal?: boolean | null;
  finLe?: dayjs.Dayjs | null;
  locals?: ILocal[] | null;
}

export class Proprietaire implements IProprietaire {
  constructor(
    public id?: number,
    public prenom?: string | null,
    public nom?: string | null,
    public email?: string | null,
    public telephoneFixe?: string | null,
    public telephonePortable?: string | null,
    public depuis?: dayjs.Dayjs | null,
    public habiteLocal?: boolean | null,
    public finLe?: dayjs.Dayjs | null,
    public locals?: ILocal[] | null
  ) {
    this.habiteLocal = this.habiteLocal ?? false;
  }
}

export function getProprietaireIdentifier(proprietaire: IProprietaire): number | undefined {
  return proprietaire.id;
}
