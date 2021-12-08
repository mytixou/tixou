import { ITiersFinanceur } from 'app/entities/tiers-financeur/tiers-financeur.model';
import { INatureActivite } from 'app/entities/nature-activite/nature-activite.model';
import { INatureMontant } from 'app/entities/nature-montant/nature-montant.model';
import { IConsommationApa } from 'app/entities/consommation-apa/consommation-apa.model';
import { IAide } from 'app/entities/aide/aide.model';

export interface IStrategieApa {
  id?: number;
  isActif?: boolean | null;
  anne?: number | null;
  montantPlafond?: number | null;
  nbPlafondheure?: number | null;
  taux?: number | null;
  tiersFinanceurs?: ITiersFinanceur[] | null;
  natureActivites?: INatureActivite[] | null;
  natureMontants?: INatureMontant[] | null;
  consommationApas?: IConsommationApa[] | null;
  aide?: IAide | null;
}

export class StrategieApa implements IStrategieApa {
  constructor(
    public id?: number,
    public isActif?: boolean | null,
    public anne?: number | null,
    public montantPlafond?: number | null,
    public nbPlafondheure?: number | null,
    public taux?: number | null,
    public tiersFinanceurs?: ITiersFinanceur[] | null,
    public natureActivites?: INatureActivite[] | null,
    public natureMontants?: INatureMontant[] | null,
    public consommationApas?: IConsommationApa[] | null,
    public aide?: IAide | null
  ) {
    this.isActif = this.isActif ?? false;
  }
}

export function getStrategieApaIdentifier(strategieApa: IStrategieApa): number | undefined {
  return strategieApa.id;
}
