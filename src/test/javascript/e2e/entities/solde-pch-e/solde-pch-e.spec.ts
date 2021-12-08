import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SoldePchEComponentsPage, SoldePchEDeleteDialog, SoldePchEUpdatePage } from './solde-pch-e.page-object';

const expect = chai.expect;

describe('SoldePchE e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let soldePchEComponentsPage: SoldePchEComponentsPage;
  let soldePchEUpdatePage: SoldePchEUpdatePage;
  let soldePchEDeleteDialog: SoldePchEDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SoldePchES', async () => {
    await navBarPage.goToEntity('solde-pch-e');
    soldePchEComponentsPage = new SoldePchEComponentsPage();
    await browser.wait(ec.visibilityOf(soldePchEComponentsPage.title), 5000);
    expect(await soldePchEComponentsPage.getTitle()).to.eq('archisolverApp.soldePchE.home.title');
    await browser.wait(ec.or(ec.visibilityOf(soldePchEComponentsPage.entities), ec.visibilityOf(soldePchEComponentsPage.noResult)), 1000);
  });

  it('should load create SoldePchE page', async () => {
    await soldePchEComponentsPage.clickOnCreateButton();
    soldePchEUpdatePage = new SoldePchEUpdatePage();
    expect(await soldePchEUpdatePage.getPageTitle()).to.eq('archisolverApp.soldePchE.home.createOrEditLabel');
    await soldePchEUpdatePage.cancel();
  });

  it('should create and save SoldePchES', async () => {
    const nbButtonsBeforeCreate = await soldePchEComponentsPage.countDeleteButtons();

    await soldePchEComponentsPage.clickOnCreateButton();

    await promise.all([
      soldePchEUpdatePage.setAnneeInput('5'),
      soldePchEUpdatePage.setMoisInput('5'),
      soldePchEUpdatePage.setSoldeMontantPchEInput('5'),
      soldePchEUpdatePage.setSoldeHeurePchEInput('5'),
      soldePchEUpdatePage.beneficiaireSelectLastOption(),
    ]);

    await soldePchEUpdatePage.save();
    expect(await soldePchEUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await soldePchEComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SoldePchE', async () => {
    const nbButtonsBeforeDelete = await soldePchEComponentsPage.countDeleteButtons();
    await soldePchEComponentsPage.clickOnLastDeleteButton();

    soldePchEDeleteDialog = new SoldePchEDeleteDialog();
    expect(await soldePchEDeleteDialog.getDialogTitle()).to.eq('archisolverApp.soldePchE.delete.question');
    await soldePchEDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(soldePchEComponentsPage.title), 5000);

    expect(await soldePchEComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
