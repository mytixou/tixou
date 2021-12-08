import { IStrategieCi } from 'app/entities/strategie-ci/strategie-ci.model';
import { IStrategieApa } from 'app/entities/strategie-apa/strategie-apa.model';
import { IStrategiePch } from 'app/entities/strategie-pch/strategie-pch.model';
import { IStrategiePchE } from 'app/entities/strategie-pch-e/strategie-pch-e.model';

export interface INatureMontant {
  id?: number;
  code?: string | null;
  libelle?: string | null;
  description?: string | null;
  strategie?: IStrategieCi | null;
  strategie?: IStrategieApa | null;
  strategie?: IStrategiePch | null;
  strategie?: IStrategiePchE | null;
}

export class NatureMontant implements INatureMontant {
  constructor(
    public id?: number,
    public code?: string | null,
    public libelle?: string | null,
    public description?: string | null,
    public strategie?: IStrategieCi | null,
    public strategie?: IStrategieApa | null,
    public strategie?: IStrategiePch | null,
    public strategie?: IStrategiePchE | null
  ) {}
}

export function getNatureMontantIdentifier(natureMontant: INatureMontant): number | undefined {
  return natureMontant.id;
}
