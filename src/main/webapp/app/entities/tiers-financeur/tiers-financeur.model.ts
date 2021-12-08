import * as dayjs from 'dayjs';
import { IStrategieCi } from 'app/entities/strategie-ci/strategie-ci.model';
import { IStrategieApa } from 'app/entities/strategie-apa/strategie-apa.model';
import { IStrategiePch } from 'app/entities/strategie-pch/strategie-pch.model';
import { IStrategiePchE } from 'app/entities/strategie-pch-e/strategie-pch-e.model';

export interface ITiersFinanceur {
  id?: number;
  nom?: string | null;
  localisation?: string | null;
  isActif?: boolean | null;
  dateInscription?: dayjs.Dayjs | null;
  anneLancement?: number | null;
  moisLancement?: number | null;
  dateResiliation?: dayjs.Dayjs | null;
  derniereAnnee?: number | null;
  dernierMois?: number | null;
  strategie?: IStrategieCi | null;
  strategie?: IStrategieApa | null;
  strategie?: IStrategiePch | null;
  strategie?: IStrategiePchE | null;
}

export class TiersFinanceur implements ITiersFinanceur {
  constructor(
    public id?: number,
    public nom?: string | null,
    public localisation?: string | null,
    public isActif?: boolean | null,
    public dateInscription?: dayjs.Dayjs | null,
    public anneLancement?: number | null,
    public moisLancement?: number | null,
    public dateResiliation?: dayjs.Dayjs | null,
    public derniereAnnee?: number | null,
    public dernierMois?: number | null,
    public strategie?: IStrategieCi | null,
    public strategie?: IStrategieApa | null,
    public strategie?: IStrategiePch | null,
    public strategie?: IStrategiePchE | null
  ) {
    this.isActif = this.isActif ?? false;
  }
}

export function getTiersFinanceurIdentifier(tiersFinanceur: ITiersFinanceur): number | undefined {
  return tiersFinanceur.id;
}
