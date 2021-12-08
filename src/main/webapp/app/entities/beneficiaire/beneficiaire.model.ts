import * as dayjs from 'dayjs';
import { ISoldeCi } from 'app/entities/solde-ci/solde-ci.model';
import { ISoldeApa } from 'app/entities/solde-apa/solde-apa.model';
import { ISoldePch } from 'app/entities/solde-pch/solde-pch.model';
import { ISoldePchE } from 'app/entities/solde-pch-e/solde-pch-e.model';
import { IConsommationCi } from 'app/entities/consommation-ci/consommation-ci.model';
import { IConsommationApa } from 'app/entities/consommation-apa/consommation-apa.model';
import { IConsommationPch } from 'app/entities/consommation-pch/consommation-pch.model';
import { IConsommationPchE } from 'app/entities/consommation-pch-e/consommation-pch-e.model';

export interface IBeneficiaire {
  id?: string;
  externeId?: string | null;
  isActif?: boolean | null;
  dateInscription?: dayjs.Dayjs | null;
  dateResiliation?: dayjs.Dayjs | null;
  soldeCis?: ISoldeCi[] | null;
  soldeApas?: ISoldeApa[] | null;
  soldePches?: ISoldePch[] | null;
  soldePchES?: ISoldePchE[] | null;
  consommationCis?: IConsommationCi[] | null;
  consommationApas?: IConsommationApa[] | null;
  consommationPches?: IConsommationPch[] | null;
  consommationPchES?: IConsommationPchE[] | null;
}

export class Beneficiaire implements IBeneficiaire {
  constructor(
    public id?: string,
    public externeId?: string | null,
    public isActif?: boolean | null,
    public dateInscription?: dayjs.Dayjs | null,
    public dateResiliation?: dayjs.Dayjs | null,
    public soldeCis?: ISoldeCi[] | null,
    public soldeApas?: ISoldeApa[] | null,
    public soldePches?: ISoldePch[] | null,
    public soldePchES?: ISoldePchE[] | null,
    public consommationCis?: IConsommationCi[] | null,
    public consommationApas?: IConsommationApa[] | null,
    public consommationPches?: IConsommationPch[] | null,
    public consommationPchES?: IConsommationPchE[] | null
  ) {
    this.isActif = this.isActif ?? false;
  }
}

export function getBeneficiaireIdentifier(beneficiaire: IBeneficiaire): string | undefined {
  return beneficiaire.id;
}
