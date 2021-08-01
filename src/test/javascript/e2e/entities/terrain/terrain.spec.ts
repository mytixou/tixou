import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TerrainComponentsPage, TerrainDeleteDialog, TerrainUpdatePage } from './terrain.page-object';

const expect = chai.expect;

describe('Terrain e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let terrainComponentsPage: TerrainComponentsPage;
  let terrainUpdatePage: TerrainUpdatePage;
  let terrainDeleteDialog: TerrainDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Terrains', async () => {
    await navBarPage.goToEntity('terrain');
    terrainComponentsPage = new TerrainComponentsPage();
    await browser.wait(ec.visibilityOf(terrainComponentsPage.title), 5000);
    expect(await terrainComponentsPage.getTitle()).to.eq('archisolverApp.terrain.home.title');
    await browser.wait(ec.or(ec.visibilityOf(terrainComponentsPage.entities), ec.visibilityOf(terrainComponentsPage.noResult)), 1000);
  });

  it('should load create Terrain page', async () => {
    await terrainComponentsPage.clickOnCreateButton();
    terrainUpdatePage = new TerrainUpdatePage();
    expect(await terrainUpdatePage.getPageTitle()).to.eq('archisolverApp.terrain.home.createOrEditLabel');
    await terrainUpdatePage.cancel();
  });

  it('should create and save Terrains', async () => {
    const nbButtonsBeforeCreate = await terrainComponentsPage.countDeleteButtons();

    await terrainComponentsPage.clickOnCreateButton();

    await promise.all([
      terrainUpdatePage.setParcelleInput('parcelle'),
      terrainUpdatePage.setSurfaceInput('5'),
      terrainUpdatePage.adresseSelectLastOption(),
    ]);

    await terrainUpdatePage.save();
    expect(await terrainUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await terrainComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Terrain', async () => {
    const nbButtonsBeforeDelete = await terrainComponentsPage.countDeleteButtons();
    await terrainComponentsPage.clickOnLastDeleteButton();

    terrainDeleteDialog = new TerrainDeleteDialog();
    expect(await terrainDeleteDialog.getDialogTitle()).to.eq('archisolverApp.terrain.delete.question');
    await terrainDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(terrainComponentsPage.title), 5000);

    expect(await terrainComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
