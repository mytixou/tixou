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
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
