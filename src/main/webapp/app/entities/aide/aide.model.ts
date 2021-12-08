import * as dayjs from 'dayjs';
import { IStrategieCi } from 'app/entities/strategie-ci/strategie-ci.model';
import { IStrategieApa } from 'app/entities/strategie-apa/strategie-apa.model';
import { IStrategiePch } from 'app/entities/strategie-pch/strategie-pch.model';
import { IStrategiePchE } from 'app/entities/strategie-pch-e/strategie-pch-e.model';
import { TypeAide } from 'app/entities/enumerations/type-aide.model';

export interface IAide {
  id?: number;
  nom?: TypeAide | null;
  isActif?: boolean | null;
  dateLancement?: dayjs.Dayjs | null;
  anneLancement?: number | null;
  moisLancement?: number | null;
  dateArret?: dayjs.Dayjs | null;
  derniereAnnee?: number | null;
  dernierMois?: number | null;
  strategieCis?: IStrategieCi[] | null;
  strategieApas?: IStrategieApa[] | null;
  strategiePches?: IStrategiePch[] | null;
  strategiePchES?: IStrategiePchE[] | null;
}

export class Aide implements IAide {
  constructor(
    public id?: number,
    public nom?: TypeAide | null,
    public isActif?: boolean | null,
    public dateLancement?: dayjs.Dayjs | null,
    public anneLancement?: number | null,
    public moisLancement?: number | null,
    public dateArret?: dayjs.Dayjs | null,
    public derniereAnnee?: number | null,
    public dernierMois?: number | null,
    public strategieCis?: IStrategieCi[] | null,
    public strategieApas?: IStrategieApa[] | null,
    public strategiePches?: IStrategiePch[] | null,
    public strategiePchES?: IStrategiePchE[] | null
  ) {
    this.isActif = this.isActif ?? false;
  }
}

export function getAideIdentifier(aide: IAide): number | undefined {
  return aide.id;
}
