import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SoldeCiComponentsPage, SoldeCiDeleteDialog, SoldeCiUpdatePage } from './solde-ci.page-object';

const expect = chai.expect;

describe('SoldeCi e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let soldeCiComponentsPage: SoldeCiComponentsPage;
  let soldeCiUpdatePage: SoldeCiUpdatePage;
  let soldeCiDeleteDialog: SoldeCiDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SoldeCis', async () => {
    await navBarPage.goToEntity('solde-ci');
    soldeCiComponentsPage = new SoldeCiComponentsPage();
    await browser.wait(ec.visibilityOf(soldeCiComponentsPage.title), 5000);
    expect(await soldeCiComponentsPage.getTitle()).to.eq('archisolverApp.soldeCi.home.title');
    await browser.wait(ec.or(ec.visibilityOf(soldeCiComponentsPage.entities), ec.visibilityOf(soldeCiComponentsPage.noResult)), 1000);
  });

  it('should load create SoldeCi page', async () => {
    await soldeCiComponentsPage.clickOnCreateButton();
    soldeCiUpdatePage = new SoldeCiUpdatePage();
    expect(await soldeCiUpdatePage.getPageTitle()).to.eq('archisolverApp.soldeCi.home.createOrEditLabel');
    await soldeCiUpdatePage.cancel();
  });

  it('should create and save SoldeCis', async () => {
    const nbButtonsBeforeCreate = await soldeCiComponentsPage.countDeleteButtons();

    await soldeCiComponentsPage.clickOnCreateButton();

    await promise.all([
      soldeCiUpdatePage.setAnneeInput('5'),
      soldeCiUpdatePage.setSoldeMontantCiInput('5'),
      soldeCiUpdatePage.setSoldeMontantCiRecInput('5'),
      soldeCiUpdatePage.beneficiaireSelectLastOption(),
    ]);

    await soldeCiUpdatePage.save();
    expect(await soldeCiUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await soldeCiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SoldeCi', async () => {
    const nbButtonsBeforeDelete = await soldeCiComponentsPage.countDeleteButtons();
    await soldeCiComponentsPage.clickOnLastDeleteButton();

    soldeCiDeleteDialog = new SoldeCiDeleteDialog();
    expect(await soldeCiDeleteDialog.getDialogTitle()).to.eq('archisolverApp.soldeCi.delete.question');
    await soldeCiDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(soldeCiComponentsPage.title), 5000);

    expect(await soldeCiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
