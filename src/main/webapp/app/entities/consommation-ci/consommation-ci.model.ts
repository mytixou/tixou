import * as dayjs from 'dayjs';
import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';
import { IStrategieCi } from 'app/entities/strategie-ci/strategie-ci.model';

export interface IConsommationCi {
  id?: number;
  date?: dayjs.Dayjs | null;
  montantCi?: number | null;
  montantRecuperable?: number | null;
  beneficiaire?: IBeneficiaire | null;
  strategieCi?: IStrategieCi | null;
}

export class ConsommationCi implements IConsommationCi {
  constructor(
    public id?: number,
    public date?: dayjs.Dayjs | null,
    public montantCi?: number | null,
    public montantRecuperable?: number | null,
    public beneficiaire?: IBeneficiaire | null,
    public strategieCi?: IStrategieCi | null
  ) {}
}

export function getConsommationCiIdentifier(consommationCi: IConsommationCi): number | undefined {
  return consommationCi.id;
}
