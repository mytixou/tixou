import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SoldePchComponentsPage, SoldePchDeleteDialog, SoldePchUpdatePage } from './solde-pch.page-object';

const expect = chai.expect;

describe('SoldePch e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let soldePchComponentsPage: SoldePchComponentsPage;
  let soldePchUpdatePage: SoldePchUpdatePage;
  let soldePchDeleteDialog: SoldePchDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SoldePches', async () => {
    await navBarPage.goToEntity('solde-pch');
    soldePchComponentsPage = new SoldePchComponentsPage();
    await browser.wait(ec.visibilityOf(soldePchComponentsPage.title), 5000);
    expect(await soldePchComponentsPage.getTitle()).to.eq('archisolverApp.soldePch.home.title');
    await browser.wait(ec.or(ec.visibilityOf(soldePchComponentsPage.entities), ec.visibilityOf(soldePchComponentsPage.noResult)), 1000);
  });

  it('should load create SoldePch page', async () => {
    await soldePchComponentsPage.clickOnCreateButton();
    soldePchUpdatePage = new SoldePchUpdatePage();
    expect(await soldePchUpdatePage.getPageTitle()).to.eq('archisolverApp.soldePch.home.createOrEditLabel');
    await soldePchUpdatePage.cancel();
  });

  it('should create and save SoldePches', async () => {
    const nbButtonsBeforeCreate = await soldePchComponentsPage.countDeleteButtons();

    await soldePchComponentsPage.clickOnCreateButton();

    await promise.all([
      soldePchUpdatePage.setAnneeInput('5'),
      soldePchUpdatePage.setMoisInput('5'),
      soldePchUpdatePage.setSoldeMontantPchInput('5'),
      soldePchUpdatePage.setSoldeHeurePchInput('5'),
      soldePchUpdatePage.beneficiaireSelectLastOption(),
    ]);

    await soldePchUpdatePage.save();
    expect(await soldePchUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await soldePchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SoldePch', async () => {
    const nbButtonsBeforeDelete = await soldePchComponentsPage.countDeleteButtons();
    await soldePchComponentsPage.clickOnLastDeleteButton();

    soldePchDeleteDialog = new SoldePchDeleteDialog();
    expect(await soldePchDeleteDialog.getDialogTitle()).to.eq('archisolverApp.soldePch.delete.question');
    await soldePchDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(soldePchComponentsPage.title), 5000);

    expect(await soldePchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
