import * as dayjs from 'dayjs';
import { IDossier } from 'app/entities/dossier/dossier.model';
import { IReponse } from 'app/entities/reponse/reponse.model';

export interface IChoixReponse {
  id?: number;
  dateChoix?: dayjs.Dayjs | null;
  dossier?: IDossier | null;
  reponse?: IReponse | null;
}

export class ChoixReponse implements IChoixReponse {
  constructor(
    public id?: number,
    public dateChoix?: dayjs.Dayjs | null,
    public dossier?: IDossier | null,
    public reponse?: IReponse | null
  ) {}
}

export function getChoixReponseIdentifier(choixReponse: IChoixReponse): number | undefined {
  return choixReponse.id;
}
