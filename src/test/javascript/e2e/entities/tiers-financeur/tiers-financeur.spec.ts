import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TiersFinanceurComponentsPage, TiersFinanceurDeleteDialog, TiersFinanceurUpdatePage } from './tiers-financeur.page-object';

const expect = chai.expect;

describe('TiersFinanceur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tiersFinanceurComponentsPage: TiersFinanceurComponentsPage;
  let tiersFinanceurUpdatePage: TiersFinanceurUpdatePage;
  let tiersFinanceurDeleteDialog: TiersFinanceurDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TiersFinanceurs', async () => {
    await navBarPage.goToEntity('tiers-financeur');
    tiersFinanceurComponentsPage = new TiersFinanceurComponentsPage();
    await browser.wait(ec.visibilityOf(tiersFinanceurComponentsPage.title), 5000);
    expect(await tiersFinanceurComponentsPage.getTitle()).to.eq('archisolverApp.tiersFinanceur.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(tiersFinanceurComponentsPage.entities), ec.visibilityOf(tiersFinanceurComponentsPage.noResult)),
      1000
    );
  });

  it('should load create TiersFinanceur page', async () => {
    await tiersFinanceurComponentsPage.clickOnCreateButton();
    tiersFinanceurUpdatePage = new TiersFinanceurUpdatePage();
    expect(await tiersFinanceurUpdatePage.getPageTitle()).to.eq('archisolverApp.tiersFinanceur.home.createOrEditLabel');
    await tiersFinanceurUpdatePage.cancel();
  });

  it('should create and save TiersFinanceurs', async () => {
    const nbButtonsBeforeCreate = await tiersFinanceurComponentsPage.countDeleteButtons();

    await tiersFinanceurComponentsPage.clickOnCreateButton();

    await promise.all([
      tiersFinanceurUpdatePage.setNomInput('nom'),
      tiersFinanceurUpdatePage.setLocalisationInput('localisation'),
      tiersFinanceurUpdatePage.getIsActifInput().click(),
      tiersFinanceurUpdatePage.setDateInscriptionInput('2000-12-31'),
      tiersFinanceurUpdatePage.setAnneLancementInput('5'),
      tiersFinanceurUpdatePage.setMoisLancementInput('5'),
      tiersFinanceurUpdatePage.setDateResiliationInput('2000-12-31'),
      tiersFinanceurUpdatePage.setDerniereAnneeInput('5'),
      tiersFinanceurUpdatePage.setDernierMoisInput('5'),
      tiersFinanceurUpdatePage.strategieSelectLastOption(),
      tiersFinanceurUpdatePage.strategieSelectLastOption(),
      tiersFinanceurUpdatePage.strategieSelectLastOption(),
      tiersFinanceurUpdatePage.strategieSelectLastOption(),
    ]);

    await tiersFinanceurUpdatePage.save();
    expect(await tiersFinanceurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tiersFinanceurComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last TiersFinanceur', async () => {
    const nbButtonsBeforeDelete = await tiersFinanceurComponentsPage.countDeleteButtons();
    await tiersFinanceurComponentsPage.clickOnLastDeleteButton();

    tiersFinanceurDeleteDialog = new TiersFinanceurDeleteDialog();
    expect(await tiersFinanceurDeleteDialog.getDialogTitle()).to.eq('archisolverApp.tiersFinanceur.delete.question');
    await tiersFinanceurDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(tiersFinanceurComponentsPage.title), 5000);

    expect(await tiersFinanceurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
