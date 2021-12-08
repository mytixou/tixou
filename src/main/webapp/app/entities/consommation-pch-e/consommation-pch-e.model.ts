import * as dayjs from 'dayjs';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { IStrategiePchE } from 'app/entities/strategie-pch-e/strategie-pch-e.model';

export interface IConsommationPchE {
  id?: number;
  date?: dayjs.Dayjs | null;
  montantCotisations?: number | null;
  nbHeures?: number | null;
  beneficiaire?: IBeneficiaire | null;
  strategiePchE?: IStrategiePchE | null;
}

export class ConsommationPchE implements IConsommationPchE {
  constructor(
    public id?: number,
    public date?: dayjs.Dayjs | null,
    public montantCotisations?: number | null,
    public nbHeures?: number | null,
    public beneficiaire?: IBeneficiaire | null,
    public strategiePchE?: IStrategiePchE | null
  ) {}
}

export function getConsommationPchEIdentifier(consommationPchE: IConsommationPchE): number | undefined {
  return consommationPchE.id;
}
