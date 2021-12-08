import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';

export interface ISoldePchE {
  id?: number;
  annee?: number | null;
  mois?: number | null;
  soldeMontantPchE?: number | null;
  soldeHeurePchE?: number | null;
  beneficiaire?: IBeneficiaire | null;
}

export class SoldePchE implements ISoldePchE {
  constructor(
    public id?: number,
    public annee?: number | null,
    public mois?: number | null,
    public soldeMontantPchE?: number | null,
    public soldeHeurePchE?: number | null,
    public beneficiaire?: IBeneficiaire | null
  ) {}
}

export function getSoldePchEIdentifier(soldePchE: ISoldePchE): number | undefined {
  return soldePchE.id;
}
