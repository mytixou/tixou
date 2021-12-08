import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConsommationPchEComponentsPage, ConsommationPchEDeleteDialog, ConsommationPchEUpdatePage } from './consommation-pch-e.page-object';

const expect = chai.expect;

describe('ConsommationPchE e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let consommationPchEComponentsPage: ConsommationPchEComponentsPage;
  let consommationPchEUpdatePage: ConsommationPchEUpdatePage;
  let consommationPchEDeleteDialog: ConsommationPchEDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ConsommationPchES', async () => {
    await navBarPage.goToEntity('consommation-pch-e');
    consommationPchEComponentsPage = new ConsommationPchEComponentsPage();
    await browser.wait(ec.visibilityOf(consommationPchEComponentsPage.title), 5000);
    expect(await consommationPchEComponentsPage.getTitle()).to.eq('archisolverApp.consommationPchE.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(consommationPchEComponentsPage.entities), ec.visibilityOf(consommationPchEComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ConsommationPchE page', async () => {
    await consommationPchEComponentsPage.clickOnCreateButton();
    consommationPchEUpdatePage = new ConsommationPchEUpdatePage();
    expect(await consommationPchEUpdatePage.getPageTitle()).to.eq('archisolverApp.consommationPchE.home.createOrEditLabel');
    await consommationPchEUpdatePage.cancel();
  });

  it('should create and save ConsommationPchES', async () => {
    const nbButtonsBeforeCreate = await consommationPchEComponentsPage.countDeleteButtons();

    await consommationPchEComponentsPage.clickOnCreateButton();

    await promise.all([
      consommationPchEUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      consommationPchEUpdatePage.setMontantCotisationsInput('5'),
      consommationPchEUpdatePage.setNbHeuresInput('5'),
      consommationPchEUpdatePage.beneficiaireSelectLastOption(),
      consommationPchEUpdatePage.strategiePchESelectLastOption(),
    ]);

    await consommationPchEUpdatePage.save();
    expect(await consommationPchEUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await consommationPchEComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ConsommationPchE', async () => {
    const nbButtonsBeforeDelete = await consommationPchEComponentsPage.countDeleteButtons();
    await consommationPchEComponentsPage.clickOnLastDeleteButton();

    consommationPchEDeleteDialog = new ConsommationPchEDeleteDialog();
    expect(await consommationPchEDeleteDialog.getDialogTitle()).to.eq('archisolverApp.consommationPchE.delete.question');
    await consommationPchEDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(consommationPchEComponentsPage.title), 5000);

    expect(await consommationPchEComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
