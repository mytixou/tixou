import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';

export interface ISoldePch {
  id?: number;
  annee?: number | null;
  mois?: number | null;
  soldeMontantPch?: number | null;
  soldeHeurePch?: number | null;
  beneficiaire?: IBeneficiaire | null;
}

export class SoldePch implements ISoldePch {
  constructor(
    public id?: number,
    public annee?: number | null,
    public mois?: number | null,
    public soldeMontantPch?: number | null,
    public soldeHeurePch?: number | null,
    public beneficiaire?: IBeneficiaire | null
  ) {}
}

export function getSoldePchIdentifier(soldePch: ISoldePch): number | undefined {
  return soldePch.id;
}
