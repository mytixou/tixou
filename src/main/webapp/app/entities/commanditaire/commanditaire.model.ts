import * as dayjs from 'dayjs';

export interface ICommanditaire {
  id?: number;
  idMetierInterne?: string | null;
  prenom?: string | null;
  nom?: string | null;
  email?: string | null;
  telephoneFixe?: string | null;
  telephonePortable?: string | null;
  connuDepuis?: dayjs.Dayjs | null;
}

export class Commanditaire implements ICommanditaire {
  constructor(
    public id?: number,
    public idMetierInterne?: string | null,
    public prenom?: string | null,
    public nom?: string | null,
    public email?: string | null,
    public telephoneFixe?: string | null,
    public telephonePortable?: string | null,
    public connuDepuis?: dayjs.Dayjs | null
  ) {}
}

export function getCommanditaireIdentifier(commanditaire: ICommanditaire): number | undefined {
  return commanditaire.id;
}
