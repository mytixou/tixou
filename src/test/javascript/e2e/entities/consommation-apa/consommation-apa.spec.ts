import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConsommationApaComponentsPage, ConsommationApaDeleteDialog, ConsommationApaUpdatePage } from './consommation-apa.page-object';

const expect = chai.expect;

describe('ConsommationApa e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let consommationApaComponentsPage: ConsommationApaComponentsPage;
  let consommationApaUpdatePage: ConsommationApaUpdatePage;
  let consommationApaDeleteDialog: ConsommationApaDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ConsommationApas', async () => {
    await navBarPage.goToEntity('consommation-apa');
    consommationApaComponentsPage = new ConsommationApaComponentsPage();
    await browser.wait(ec.visibilityOf(consommationApaComponentsPage.title), 5000);
    expect(await consommationApaComponentsPage.getTitle()).to.eq('archisolverApp.consommationApa.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(consommationApaComponentsPage.entities), ec.visibilityOf(consommationApaComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ConsommationApa page', async () => {
    await consommationApaComponentsPage.clickOnCreateButton();
    consommationApaUpdatePage = new ConsommationApaUpdatePage();
    expect(await consommationApaUpdatePage.getPageTitle()).to.eq('archisolverApp.consommationApa.home.createOrEditLabel');
    await consommationApaUpdatePage.cancel();
  });

  it('should create and save ConsommationApas', async () => {
    const nbButtonsBeforeCreate = await consommationApaComponentsPage.countDeleteButtons();

    await consommationApaComponentsPage.clickOnCreateButton();

    await promise.all([
      consommationApaUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      consommationApaUpdatePage.setMontantCotisationsInput('5'),
      consommationApaUpdatePage.setNbHeuresInput('5'),
      consommationApaUpdatePage.beneficiaireSelectLastOption(),
      consommationApaUpdatePage.strategieApaSelectLastOption(),
    ]);

    await consommationApaUpdatePage.save();
    expect(await consommationApaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await consommationApaComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ConsommationApa', async () => {
    const nbButtonsBeforeDelete = await consommationApaComponentsPage.countDeleteButtons();
    await consommationApaComponentsPage.clickOnLastDeleteButton();

    consommationApaDeleteDialog = new ConsommationApaDeleteDialog();
    expect(await consommationApaDeleteDialog.getDialogTitle()).to.eq('archisolverApp.consommationApa.delete.question');
    await consommationApaDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(consommationApaComponentsPage.title), 5000);

    expect(await consommationApaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
