import { ITiersFinanceur } from 'app/entities/tiers-financeur/tiers-financeur.model';
import { INatureActivite } from 'app/entities/nature-activite/nature-activite.model';
import { INatureMontant } from 'app/entities/nature-montant/nature-montant.model';
import { IConsommationPchE } from 'app/entities/consommation-pch-e/consommation-pch-e.model';
import { IAide } from 'app/entities/aide/aide.model';

export interface IStrategiePchE {
  id?: number;
  isActif?: boolean | null;
  anne?: number | null;
  montantPlafond?: number | null;
  nbPlafondheure?: number | null;
  taux?: number | null;
  tiersFinanceurs?: ITiersFinanceur[] | null;
  natureActivites?: INatureActivite[] | null;
  natureMontants?: INatureMontant[] | null;
  consommationPchES?: IConsommationPchE[] | null;
  aide?: IAide | null;
}

export class StrategiePchE implements IStrategiePchE {
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
    public consommationPchES?: IConsommationPchE[] | null,
    public aide?: IAide | null
  ) {
    this.isActif = this.isActif ?? false;
  }
}

export function getStrategiePchEIdentifier(strategiePchE: IStrategiePchE): number | undefined {
  return strategiePchE.id;
}
