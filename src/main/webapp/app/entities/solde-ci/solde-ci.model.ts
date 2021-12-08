import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';

export interface ISoldeCi {
  id?: number;
  annee?: number | null;
  soldeMontantCi?: number | null;
  soldeMontantCiRec?: number | null;
  beneficiaire?: IBeneficiaire | null;
}

export class SoldeCi implements ISoldeCi {
  constructor(
    public id?: number,
    public annee?: number | null,
    public soldeMontantCi?: number | null,
    public soldeMontantCiRec?: number | null,
    public beneficiaire?: IBeneficiaire | null
  ) {}
}

export function getSoldeCiIdentifier(soldeCi: ISoldeCi): number | undefined {
  return soldeCi.id;
}
