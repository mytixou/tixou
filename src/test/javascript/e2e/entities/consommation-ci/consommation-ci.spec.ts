import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConsommationCiComponentsPage, ConsommationCiDeleteDialog, ConsommationCiUpdatePage } from './consommation-ci.page-object';

const expect = chai.expect;

describe('ConsommationCi e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let consommationCiComponentsPage: ConsommationCiComponentsPage;
  let consommationCiUpdatePage: ConsommationCiUpdatePage;
  let consommationCiDeleteDialog: ConsommationCiDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ConsommationCis', async () => {
    await navBarPage.goToEntity('consommation-ci');
    consommationCiComponentsPage = new ConsommationCiComponentsPage();
    await browser.wait(ec.visibilityOf(consommationCiComponentsPage.title), 5000);
    expect(await consommationCiComponentsPage.getTitle()).to.eq('archisolverApp.consommationCi.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(consommationCiComponentsPage.entities), ec.visibilityOf(consommationCiComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ConsommationCi page', async () => {
    await consommationCiComponentsPage.clickOnCreateButton();
    consommationCiUpdatePage = new ConsommationCiUpdatePage();
    expect(await consommationCiUpdatePage.getPageTitle()).to.eq('archisolverApp.consommationCi.home.createOrEditLabel');
    await consommationCiUpdatePage.cancel();
  });

  it('should create and save ConsommationCis', async () => {
    const nbButtonsBeforeCreate = await consommationCiComponentsPage.countDeleteButtons();

    await consommationCiComponentsPage.clickOnCreateButton();

    await promise.all([
      consommationCiUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      consommationCiUpdatePage.setMontantCiInput('5'),
      consommationCiUpdatePage.setMontantRecuperableInput('5'),
      consommationCiUpdatePage.beneficiaireSelectLastOption(),
      consommationCiUpdatePage.strategieCiSelectLastOption(),
    ]);

    await consommationCiUpdatePage.save();
    expect(await consommationCiUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await consommationCiComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ConsommationCi', async () => {
    const nbButtonsBeforeDelete = await consommationCiComponentsPage.countDeleteButtons();
    await consommationCiComponentsPage.clickOnLastDeleteButton();

    consommationCiDeleteDialog = new ConsommationCiDeleteDialog();
    expect(await consommationCiDeleteDialog.getDialogTitle()).to.eq('archisolverApp.consommationCi.delete.question');
    await consommationCiDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(consommationCiComponentsPage.title), 5000);

    expect(await consommationCiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
