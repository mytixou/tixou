import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'terrain',
        data: { pageTitle: 'archisolverApp.terrain.home.title' },
        loadChildren: () => import('./terrain/terrain.module').then(m => m.TerrainModule),
      },
      {
        path: 'batiment',
        data: { pageTitle: 'archisolverApp.batiment.home.title' },
        loadChildren: () => import('./batiment/batiment.module').then(m => m.BatimentModule),
      },
      {
        path: 'local',
        data: { pageTitle: 'archisolverApp.local.home.title' },
        loadChildren: () => import('./local/local.module').then(m => m.LocalModule),
      },
      {
        path: 'proprietaire',
        data: { pageTitle: 'archisolverApp.proprietaire.home.title' },
        loadChildren: () => import('./proprietaire/proprietaire.module').then(m => m.ProprietaireModule),
      },
      {
        path: 'adresse',
        data: { pageTitle: 'archisolverApp.adresse.home.title' },
        loadChildren: () => import('./adresse/adresse.module').then(m => m.AdresseModule),
      },
      {
        path: 'departement',
        data: { pageTitle: 'archisolverApp.departement.home.title' },
        loadChildren: () => import('./departement/departement.module').then(m => m.DepartementModule),
      },
      {
        path: 'region',
        data: { pageTitle: 'archisolverApp.region.home.title' },
        loadChildren: () => import('./region/region.module').then(m => m.RegionModule),
      },
      {
        path: 'commanditaire',
        data: { pageTitle: 'archisolverApp.commanditaire.home.title' },
        loadChildren: () => import('./commanditaire/commanditaire.module').then(m => m.CommanditaireModule),
      },
      {
        path: 'dossier',
        data: { pageTitle: 'archisolverApp.dossier.home.title' },
        loadChildren: () => import('./dossier/dossier.module').then(m => m.DossierModule),
      },
      {
        path: 'questionnaire',
        data: { pageTitle: 'archisolverApp.questionnaire.home.title' },
        loadChildren: () => import('./questionnaire/questionnaire.module').then(m => m.QuestionnaireModule),
      },
      {
        path: 'question',
        data: { pageTitle: 'archisolverApp.question.home.title' },
        loadChildren: () => import('./question/question.module').then(m => m.QuestionModule),
      },
      {
        path: 'reponse',
        data: { pageTitle: 'archisolverApp.reponse.home.title' },
        loadChildren: () => import('./reponse/reponse.module').then(m => m.ReponseModule),
      },
      {
        path: 'choix-reponse',
        data: { pageTitle: 'archisolverApp.choixReponse.home.title' },
        loadChildren: () => import('./choix-reponse/choix-reponse.module').then(m => m.ChoixReponseModule),
      },
      {
        path: 'impact',
        data: { pageTitle: 'archisolverApp.impact.home.title' },
        loadChildren: () => import('./impact/impact.module').then(m => m.ImpactModule),
      },
      {
        path: 'ref-contrainte',
        data: { pageTitle: 'archisolverApp.refContrainte.home.title' },
        loadChildren: () => import('./ref-contrainte/ref-contrainte.module').then(m => m.RefContrainteModule),
      },
      {
        path: 'beneficiaire',
        data: { pageTitle: 'archisolverApp.beneficiaire.home.title' },
        loadChildren: () => import('./beneficiaire/beneficiaire.module').then(m => m.BeneficiaireModule),
      },
      {
        path: 'solde-ci',
        data: { pageTitle: 'archisolverApp.soldeCi.home.title' },
        loadChildren: () => import('./solde-ci/solde-ci.module').then(m => m.SoldeCiModule),
      },
      {
        path: 'solde-apa',
        data: { pageTitle: 'archisolverApp.soldeApa.home.title' },
        loadChildren: () => import('./solde-apa/solde-apa.module').then(m => m.SoldeApaModule),
      },
      {
        path: 'solde-pch',
        data: { pageTitle: 'archisolverApp.soldePch.home.title' },
        loadChildren: () => import('./solde-pch/solde-pch.module').then(m => m.SoldePchModule),
      },
      {
        path: 'solde-pch-e',
        data: { pageTitle: 'archisolverApp.soldePchE.home.title' },
        loadChildren: () => import('./solde-pch-e/solde-pch-e.module').then(m => m.SoldePchEModule),
      },
      {
        path: 'tiers-financeur',
        data: { pageTitle: 'archisolverApp.tiersFinanceur.home.title' },
        loadChildren: () => import('./tiers-financeur/tiers-financeur.module').then(m => m.TiersFinanceurModule),
      },
      {
        path: 'aide',
        data: { pageTitle: 'archisolverApp.aide.home.title' },
        loadChildren: () => import('./aide/aide.module').then(m => m.AideModule),
      },
      {
        path: 'strategie-ci',
        data: { pageTitle: 'archisolverApp.strategieCi.home.title' },
        loadChildren: () => import('./strategie-ci/strategie-ci.module').then(m => m.StrategieCiModule),
      },
      {
        path: 'strategie-apa',
        data: { pageTitle: 'archisolverApp.strategieApa.home.title' },
        loadChildren: () => import('./strategie-apa/strategie-apa.module').then(m => m.StrategieApaModule),
      },
      {
        path: 'strategie-pch',
        data: { pageTitle: 'archisolverApp.strategiePch.home.title' },
        loadChildren: () => import('./strategie-pch/strategie-pch.module').then(m => m.StrategiePchModule),
      },
      {
        path: 'strategie-pch-e',
        data: { pageTitle: 'archisolverApp.strategiePchE.home.title' },
        loadChildren: () => import('./strategie-pch-e/strategie-pch-e.module').then(m => m.StrategiePchEModule),
      },
      {
        path: 'nature-activite',
        data: { pageTitle: 'archisolverApp.natureActivite.home.title' },
        loadChildren: () => import('./nature-activite/nature-activite.module').then(m => m.NatureActiviteModule),
      },
      {
        path: 'nature-montant',
        data: { pageTitle: 'archisolverApp.natureMontant.home.title' },
        loadChildren: () => import('./nature-montant/nature-montant.module').then(m => m.NatureMontantModule),
      },
      {
        path: 'consommation-ci',
        data: { pageTitle: 'archisolverApp.consommationCi.home.title' },
        loadChildren: () => import('./consommation-ci/consommation-ci.module').then(m => m.ConsommationCiModule),
      },
      {
        path: 'consommation-apa',
        data: { pageTitle: 'archisolverApp.consommationApa.home.title' },
        loadChildren: () => import('./consommation-apa/consommation-apa.module').then(m => m.ConsommationApaModule),
      },
      {
        path: 'consommation-pch',
        data: { pageTitle: 'archisolverApp.consommationPch.home.title' },
        loadChildren: () => import('./consommation-pch/consommation-pch.module').then(m => m.ConsommationPchModule),
      },
      {
        path: 'consommation-pch-e',
        data: { pageTitle: 'archisolverApp.consommationPchE.home.title' },
        loadChildren: () => import('./consommation-pch-e/consommation-pch-e.module').then(m => m.ConsommationPchEModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
