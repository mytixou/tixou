import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SoldeApaComponentsPage, SoldeApaDeleteDialog, SoldeApaUpdatePage } from './solde-apa.page-object';

const expect = chai.expect;

describe('SoldeApa e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let soldeApaComponentsPage: SoldeApaComponentsPage;
  let soldeApaUpdatePage: SoldeApaUpdatePage;
  let soldeApaDeleteDialog: SoldeApaDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SoldeApas', async () => {
    await navBarPage.goToEntity('solde-apa');
    soldeApaComponentsPage = new SoldeApaComponentsPage();
    await browser.wait(ec.visibilityOf(soldeApaComponentsPage.title), 5000);
    expect(await soldeApaComponentsPage.getTitle()).to.eq('archisolverApp.soldeApa.home.title');
    await browser.wait(ec.or(ec.visibilityOf(soldeApaComponentsPage.entities), ec.visibilityOf(soldeApaComponentsPage.noResult)), 1000);
  });

  it('should load create SoldeApa page', async () => {
    await soldeApaComponentsPage.clickOnCreateButton();
    soldeApaUpdatePage = new SoldeApaUpdatePage();
    expect(await soldeApaUpdatePage.getPageTitle()).to.eq('archisolverApp.soldeApa.home.createOrEditLabel');
    await soldeApaUpdatePage.cancel();
  });

  it('should create and save SoldeApas', async () => {
    const nbButtonsBeforeCreate = await soldeApaComponentsPage.countDeleteButtons();

    await soldeApaComponentsPage.clickOnCreateButton();

    await promise.all([
      soldeApaUpdatePage.setAnneeInput('5'),
      soldeApaUpdatePage.setMoisInput('5'),
      soldeApaUpdatePage.setSoldeMontantApaInput('5'),
      soldeApaUpdatePage.setSoldeHeureApaInput('5'),
      soldeApaUpdatePage.beneficiaireSelectLastOption(),
    ]);

    await soldeApaUpdatePage.save();
    expect(await soldeApaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await soldeApaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SoldeApa', async () => {
    const nbButtonsBeforeDelete = await soldeApaComponentsPage.countDeleteButtons();
    await soldeApaComponentsPage.clickOnLastDeleteButton();

    soldeApaDeleteDialog = new SoldeApaDeleteDialog();
    expect(await soldeApaDeleteDialog.getDialogTitle()).to.eq('archisolverApp.soldeApa.delete.question');
    await soldeApaDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(soldeApaComponentsPage.title), 5000);

    expect(await soldeApaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
