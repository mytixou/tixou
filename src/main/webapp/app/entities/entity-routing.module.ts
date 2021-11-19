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
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
