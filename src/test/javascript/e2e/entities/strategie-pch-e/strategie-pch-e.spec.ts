import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StrategiePchEComponentsPage, StrategiePchEDeleteDialog, StrategiePchEUpdatePage } from './strategie-pch-e.page-object';

const expect = chai.expect;

describe('StrategiePchE e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let strategiePchEComponentsPage: StrategiePchEComponentsPage;
  let strategiePchEUpdatePage: StrategiePchEUpdatePage;
  let strategiePchEDeleteDialog: StrategiePchEDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load StrategiePchES', async () => {
    await navBarPage.goToEntity('strategie-pch-e');
    strategiePchEComponentsPage = new StrategiePchEComponentsPage();
    await browser.wait(ec.visibilityOf(strategiePchEComponentsPage.title), 5000);
    expect(await strategiePchEComponentsPage.getTitle()).to.eq('archisolverApp.strategiePchE.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(strategiePchEComponentsPage.entities), ec.visibilityOf(strategiePchEComponentsPage.noResult)),
      1000
    );
  });

  it('should load create StrategiePchE page', async () => {
    await strategiePchEComponentsPage.clickOnCreateButton();
    strategiePchEUpdatePage = new StrategiePchEUpdatePage();
    expect(await strategiePchEUpdatePage.getPageTitle()).to.eq('archisolverApp.strategiePchE.home.createOrEditLabel');
    await strategiePchEUpdatePage.cancel();
  });

  it('should create and save StrategiePchES', async () => {
    const nbButtonsBeforeCreate = await strategiePchEComponentsPage.countDeleteButtons();

    await strategiePchEComponentsPage.clickOnCreateButton();

    await promise.all([
      strategiePchEUpdatePage.getIsActifInput().click(),
      strategiePchEUpdatePage.setAnneInput('5'),
      strategiePchEUpdatePage.setMontantPlafondInput('5'),
      strategiePchEUpdatePage.setNbPlafondheureInput('5'),
      strategiePchEUpdatePage.setTauxInput('5'),
      strategiePchEUpdatePage.aideSelectLastOption(),
    ]);

    await strategiePchEUpdatePage.save();
    expect(await strategiePchEUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await strategiePchEComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last StrategiePchE', async () => {
    const nbButtonsBeforeDelete = await strategiePchEComponentsPage.countDeleteButtons();
    await strategiePchEComponentsPage.clickOnLastDeleteButton();

    strategiePchEDeleteDialog = new StrategiePchEDeleteDialog();
    expect(await strategiePchEDeleteDialog.getDialogTitle()).to.eq('archisolverApp.strategiePchE.delete.question');
    await strategiePchEDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(strategiePchEComponentsPage.title), 5000);

    expect(await strategiePchEComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
