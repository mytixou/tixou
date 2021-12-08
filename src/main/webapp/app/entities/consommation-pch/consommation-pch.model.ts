import * as dayjs from 'dayjs';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { IStrategiePch } from 'app/entities/strategie-pch/strategie-pch.model';

export interface IConsommationPch {
  id?: number;
  date?: dayjs.Dayjs | null;
  montantCotisations?: number | null;
  nbHeures?: number | null;
  beneficiaire?: IBeneficiaire | null;
  strategiePch?: IStrategiePch | null;
}

export class ConsommationPch implements IConsommationPch {
  constructor(
    public id?: number,
    public date?: dayjs.Dayjs | null,
    public montantCotisations?: number | null,
    public nbHeures?: number | null,
    public beneficiaire?: IBeneficiaire | null,
    public strategiePch?: IStrategiePch | null
  ) {}
}

export function getConsommationPchIdentifier(consommationPch: IConsommationPch): number | undefined {
  return consommationPch.id;
}
