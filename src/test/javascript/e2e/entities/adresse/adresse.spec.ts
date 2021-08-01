import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AdresseComponentsPage, AdresseDeleteDialog, AdresseUpdatePage } from './adresse.page-object';

const expect = chai.expect;

describe('Adresse e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let adresseComponentsPage: AdresseComponentsPage;
  let adresseUpdatePage: AdresseUpdatePage;
  let adresseDeleteDialog: AdresseDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Adresses', async () => {
    await navBarPage.goToEntity('adresse');
    adresseComponentsPage = new AdresseComponentsPage();
    await browser.wait(ec.visibilityOf(adresseComponentsPage.title), 5000);
    expect(await adresseComponentsPage.getTitle()).to.eq('archisolverApp.adresse.home.title');
    await browser.wait(ec.or(ec.visibilityOf(adresseComponentsPage.entities), ec.visibilityOf(adresseComponentsPage.noResult)), 1000);
  });

  it('should load create Adresse page', async () => {
    await adresseComponentsPage.clickOnCreateButton();
    adresseUpdatePage = new AdresseUpdatePage();
    expect(await adresseUpdatePage.getPageTitle()).to.eq('archisolverApp.adresse.home.createOrEditLabel');
    await adresseUpdatePage.cancel();
  });

  it('should create and save Adresses', async () => {
    const nbButtonsBeforeCreate = await adresseComponentsPage.countDeleteButtons();

    await adresseComponentsPage.clickOnCreateButton();

    await promise.all([
      adresseUpdatePage.setAdresseLigne1Input('adresseLigne1'),
      adresseUpdatePage.setAdresseLigne2Input('adresseLigne2'),
      adresseUpdatePage.setCodePostalInput('codePostal'),
      adresseUpdatePage.setVilleInput('ville'),
      adresseUpdatePage.setStateProvinceInput('stateProvince'),
      adresseUpdatePage.departementSelectLastOption(),
    ]);

    await adresseUpdatePage.save();
    expect(await adresseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await adresseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Adresse', async () => {
    const nbButtonsBeforeDelete = await adresseComponentsPage.countDeleteButtons();
    await adresseComponentsPage.clickOnLastDeleteButton();

    adresseDeleteDialog = new AdresseDeleteDialog();
    expect(await adresseDeleteDialog.getDialogTitle()).to.eq('archisolverApp.adresse.delete.question');
    await adresseDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(adresseComponentsPage.title), 5000);

    expect(await adresseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
