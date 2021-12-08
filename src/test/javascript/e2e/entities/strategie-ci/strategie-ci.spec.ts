import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StrategieCiComponentsPage, StrategieCiDeleteDialog, StrategieCiUpdatePage } from './strategie-ci.page-object';

const expect = chai.expect;

describe('StrategieCi e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let strategieCiComponentsPage: StrategieCiComponentsPage;
  let strategieCiUpdatePage: StrategieCiUpdatePage;
  let strategieCiDeleteDialog: StrategieCiDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load StrategieCis', async () => {
    await navBarPage.goToEntity('strategie-ci');
    strategieCiComponentsPage = new StrategieCiComponentsPage();
    await browser.wait(ec.visibilityOf(strategieCiComponentsPage.title), 5000);
    expect(await strategieCiComponentsPage.getTitle()).to.eq('archisolverApp.strategieCi.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(strategieCiComponentsPage.entities), ec.visibilityOf(strategieCiComponentsPage.noResult)),
      1000
    );
  });

  it('should load create StrategieCi page', async () => {
    await strategieCiComponentsPage.clickOnCreateButton();
    strategieCiUpdatePage = new StrategieCiUpdatePage();
    expect(await strategieCiUpdatePage.getPageTitle()).to.eq('archisolverApp.strategieCi.home.createOrEditLabel');
    await strategieCiUpdatePage.cancel();
  });

  it('should create and save StrategieCis', async () => {
    const nbButtonsBeforeCreate = await strategieCiComponentsPage.countDeleteButtons();

    await strategieCiComponentsPage.clickOnCreateButton();

    await promise.all([
      strategieCiUpdatePage.getIsActifInput().click(),
      strategieCiUpdatePage.setAnneInput('5'),
      strategieCiUpdatePage.setMontantPlafondInput('5'),
      strategieCiUpdatePage.setTauxInput('5'),
      strategieCiUpdatePage.aideSelectLastOption(),
    ]);

    await strategieCiUpdatePage.save();
    expect(await strategieCiUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await strategieCiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last StrategieCi', async () => {
    const nbButtonsBeforeDelete = await strategieCiComponentsPage.countDeleteButtons();
    await strategieCiComponentsPage.clickOnLastDeleteButton();

    strategieCiDeleteDialog = new StrategieCiDeleteDialog();
    expect(await strategieCiDeleteDialog.getDialogTitle()).to.eq('archisolverApp.strategieCi.delete.question');
    await strategieCiDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(strategieCiComponentsPage.title), 5000);

    expect(await strategieCiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
