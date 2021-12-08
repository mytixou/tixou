import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StrategiePchComponentsPage, StrategiePchDeleteDialog, StrategiePchUpdatePage } from './strategie-pch.page-object';

const expect = chai.expect;

describe('StrategiePch e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let strategiePchComponentsPage: StrategiePchComponentsPage;
  let strategiePchUpdatePage: StrategiePchUpdatePage;
  let strategiePchDeleteDialog: StrategiePchDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load StrategiePches', async () => {
    await navBarPage.goToEntity('strategie-pch');
    strategiePchComponentsPage = new StrategiePchComponentsPage();
    await browser.wait(ec.visibilityOf(strategiePchComponentsPage.title), 5000);
    expect(await strategiePchComponentsPage.getTitle()).to.eq('archisolverApp.strategiePch.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(strategiePchComponentsPage.entities), ec.visibilityOf(strategiePchComponentsPage.noResult)),
      1000
    );
  });

  it('should load create StrategiePch page', async () => {
    await strategiePchComponentsPage.clickOnCreateButton();
    strategiePchUpdatePage = new StrategiePchUpdatePage();
    expect(await strategiePchUpdatePage.getPageTitle()).to.eq('archisolverApp.strategiePch.home.createOrEditLabel');
    await strategiePchUpdatePage.cancel();
  });

  it('should create and save StrategiePches', async () => {
    const nbButtonsBeforeCreate = await strategiePchComponentsPage.countDeleteButtons();

    await strategiePchComponentsPage.clickOnCreateButton();

    await promise.all([
      strategiePchUpdatePage.getIsActifInput().click(),
      strategiePchUpdatePage.setAnneInput('5'),
      strategiePchUpdatePage.setMontantPlafondInput('5'),
      strategiePchUpdatePage.setNbPlafondheureInput('5'),
      strategiePchUpdatePage.setTauxInput('5'),
      strategiePchUpdatePage.aideSelectLastOption(),
    ]);

    await strategiePchUpdatePage.save();
    expect(await strategiePchUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await strategiePchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last StrategiePch', async () => {
    const nbButtonsBeforeDelete = await strategiePchComponentsPage.countDeleteButtons();
    await strategiePchComponentsPage.clickOnLastDeleteButton();

    strategiePchDeleteDialog = new StrategiePchDeleteDialog();
    expect(await strategiePchDeleteDialog.getDialogTitle()).to.eq('archisolverApp.strategiePch.delete.question');
    await strategiePchDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(strategiePchComponentsPage.title), 5000);

    expect(await strategiePchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
