import { ITiersFinanceur } from 'app/entities/tiers-financeur/tiers-financeur.model';
import { INatureActivite } from 'app/entities/nature-activite/nature-activite.model';
import { INatureMontant } from 'app/entities/nature-montant/nature-montant.model';
import { IConsommationCi } from 'app/entities/consommation-ci/consommation-ci.model';
import { IAide } from 'app/entities/aide/aide.model';

export interface IStrategieCi {
  id?: number;
  isActif?: boolean | null;
  anne?: number | null;
  montantPlafond?: number | null;
  taux?: number | null;
  tiersFinanceurs?: ITiersFinanceur[] | null;
  natureActivites?: INatureActivite[] | null;
  natureMontants?: INatureMontant[] | null;
  consommationCis?: IConsommationCi[] | null;
  aide?: IAide | null;
}

export class StrategieCi implements IStrategieCi {
  constructor(
    public id?: number,
    public isActif?: boolean | null,
    public anne?: number | null,
    public montantPlafond?: number | null,
    public taux?: number | null,
    public tiersFinanceurs?: ITiersFinanceur[] | null,
    public natureActivites?: INatureActivite[] | null,
    public natureMontants?: INatureMontant[] | null,
    public consommationCis?: IConsommationCi[] | null,
    public aide?: IAide | null
  ) {
    this.isActif = this.isActif ?? false;
  }
}

export function getStrategieCiIdentifier(strategieCi: IStrategieCi): number | undefined {
  return strategieCi.id;
}
