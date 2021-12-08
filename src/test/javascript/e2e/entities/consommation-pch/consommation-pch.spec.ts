import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConsommationPchComponentsPage, ConsommationPchDeleteDialog, ConsommationPchUpdatePage } from './consommation-pch.page-object';

const expect = chai.expect;

describe('ConsommationPch e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let consommationPchComponentsPage: ConsommationPchComponentsPage;
  let consommationPchUpdatePage: ConsommationPchUpdatePage;
  let consommationPchDeleteDialog: ConsommationPchDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ConsommationPches', async () => {
    await navBarPage.goToEntity('consommation-pch');
    consommationPchComponentsPage = new ConsommationPchComponentsPage();
    await browser.wait(ec.visibilityOf(consommationPchComponentsPage.title), 5000);
    expect(await consommationPchComponentsPage.getTitle()).to.eq('archisolverApp.consommationPch.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(consommationPchComponentsPage.entities), ec.visibilityOf(consommationPchComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ConsommationPch page', async () => {
    await consommationPchComponentsPage.clickOnCreateButton();
    consommationPchUpdatePage = new ConsommationPchUpdatePage();
    expect(await consommationPchUpdatePage.getPageTitle()).to.eq('archisolverApp.consommationPch.home.createOrEditLabel');
    await consommationPchUpdatePage.cancel();
  });

  it('should create and save ConsommationPches', async () => {
    const nbButtonsBeforeCreate = await consommationPchComponentsPage.countDeleteButtons();

    await consommationPchComponentsPage.clickOnCreateButton();

    await promise.all([
      consommationPchUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      consommationPchUpdatePage.setMontantCotisationsInput('5'),
      consommationPchUpdatePage.setNbHeuresInput('5'),
      consommationPchUpdatePage.beneficiaireSelectLastOption(),
      consommationPchUpdatePage.strategiePchSelectLastOption(),
    ]);

    await consommationPchUpdatePage.save();
    expect(await consommationPchUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await consommationPchComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ConsommationPch', async () => {
    const nbButtonsBeforeDelete = await consommationPchComponentsPage.countDeleteButtons();
    await consommationPchComponentsPage.clickOnLastDeleteButton();

    consommationPchDeleteDialog = new ConsommationPchDeleteDialog();
    expect(await consommationPchDeleteDialog.getDialogTitle()).to.eq('archisolverApp.consommationPch.delete.question');
    await consommationPchDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(consommationPchComponentsPage.title), 5000);

    expect(await consommationPchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
