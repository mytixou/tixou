import * as dayjs from 'dayjs';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { IStrategieApa } from 'app/entities/strategie-apa/strategie-apa.model';

export interface IConsommationApa {
  id?: number;
  date?: dayjs.Dayjs | null;
  montantCotisations?: number | null;
  nbHeures?: number | null;
  beneficiaire?: IBeneficiaire | null;
  strategieApa?: IStrategieApa | null;
}

export class ConsommationApa implements IConsommationApa {
  constructor(
    public id?: number,
    public date?: dayjs.Dayjs | null,
    public montantCotisations?: number | null,
    public nbHeures?: number | null,
    public beneficiaire?: IBeneficiaire | null,
    public strategieApa?: IStrategieApa | null
  ) {}
}

export function getConsommationApaIdentifier(consommationApa: IConsommationApa): number | undefined {
  return consommationApa.id;
}
