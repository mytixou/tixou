import * as dayjs from 'dayjs';
import { ICommanditaire } from 'app/entities/commanditaire/commanditaire.model';

export interface IDossier {
  id?: number;
  designation?: string | null;
  description?: string | null;
  dateCreation?: dayjs.Dayjs | null;
  dateCloture?: dayjs.Dayjs | null;
  commanditaire?: ICommanditaire | null;
}

export class Dossier implements IDossier {
  constructor(
    public id?: number,
    public designation?: string | null,
    public description?: string | null,
    public dateCreation?: dayjs.Dayjs | null,
    public dateCloture?: dayjs.Dayjs | null,
    public commanditaire?: ICommanditaire | null
  ) {}
}

export function getDossierIdentifier(dossier: IDossier): number | undefined {
  return dossier.id;
}
