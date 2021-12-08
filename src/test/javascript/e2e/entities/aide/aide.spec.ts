import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AideComponentsPage, AideDeleteDialog, AideUpdatePage } from './aide.page-object';

const expect = chai.expect;

describe('Aide e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let aideComponentsPage: AideComponentsPage;
  let aideUpdatePage: AideUpdatePage;
  let aideDeleteDialog: AideDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Aides', async () => {
    await navBarPage.goToEntity('aide');
    aideComponentsPage = new AideComponentsPage();
    await browser.wait(ec.visibilityOf(aideComponentsPage.title), 5000);
    expect(await aideComponentsPage.getTitle()).to.eq('archisolverApp.aide.home.title');
    await browser.wait(ec.or(ec.visibilityOf(aideComponentsPage.entities), ec.visibilityOf(aideComponentsPage.noResult)), 1000);
  });

  it('should load create Aide page', async () => {
    await aideComponentsPage.clickOnCreateButton();
    aideUpdatePage = new AideUpdatePage();
    expect(await aideUpdatePage.getPageTitle()).to.eq('archisolverApp.aide.home.createOrEditLabel');
    await aideUpdatePage.cancel();
  });

  it('should create and save Aides', async () => {
    const nbButtonsBeforeCreate = await aideComponentsPage.countDeleteButtons();

    await aideComponentsPage.clickOnCreateButton();

    await promise.all([
      aideUpdatePage.nomSelectLastOption(),
      aideUpdatePage.getIsActifInput().click(),
      aideUpdatePage.setDateLancementInput('2000-12-31'),
      aideUpdatePage.setAnneLancementInput('5'),
      aideUpdatePage.setMoisLancementInput('5'),
      aideUpdatePage.setDateArretInput('2000-12-31'),
      aideUpdatePage.setDerniereAnneeInput('5'),
      aideUpdatePage.setDernierMoisInput('5'),
    ]);

    await aideUpdatePage.save();
    expect(await aideUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await aideComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Aide', async () => {
    const nbButtonsBeforeDelete = await aideComponentsPage.countDeleteButtons();
    await aideComponentsPage.clickOnLastDeleteButton();

    aideDeleteDialog = new AideDeleteDialog();
    expect(await aideDeleteDialog.getDialogTitle()).to.eq('archisolverApp.aide.delete.question');
    await aideDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(aideComponentsPage.title), 5000);

    expect(await aideComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
