import { IBeneficiaire } from 'app/entities/beneficiaire/beneficiaire.model';

export interface ISoldeApa {
  id?: number;
  annee?: number | null;
  mois?: number | null;
  soldeMontantApa?: number | null;
  soldeHeureApa?: number | null;
  beneficiaire?: IBeneficiaire | null;
}

export class SoldeApa implements ISoldeApa {
  constructor(
    public id?: number,
    public annee?: number | null,
    public mois?: number | null,
    public soldeMontantApa?: number | null,
    public soldeHeureApa?: number | null,
    public beneficiaire?: IBeneficiaire | null
  ) {}
}

export function getSoldeApaIdentifier(soldeApa: ISoldeApa): number | undefined {
  return soldeApa.id;
}
