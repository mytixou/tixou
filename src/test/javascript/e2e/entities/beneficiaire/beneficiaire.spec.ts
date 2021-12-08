import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BeneficiaireComponentsPage, BeneficiaireDeleteDialog, BeneficiaireUpdatePage } from './beneficiaire.page-object';

const expect = chai.expect;

describe('Beneficiaire e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let beneficiaireComponentsPage: BeneficiaireComponentsPage;
  let beneficiaireUpdatePage: BeneficiaireUpdatePage;
  let beneficiaireDeleteDialog: BeneficiaireDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Beneficiaires', async () => {
    await navBarPage.goToEntity('beneficiaire');
    beneficiaireComponentsPage = new BeneficiaireComponentsPage();
    await browser.wait(ec.visibilityOf(beneficiaireComponentsPage.title), 5000);
    expect(await beneficiaireComponentsPage.getTitle()).to.eq('archisolverApp.beneficiaire.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(beneficiaireComponentsPage.entities), ec.visibilityOf(beneficiaireComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Beneficiaire page', async () => {
    await beneficiaireComponentsPage.clickOnCreateButton();
    beneficiaireUpdatePage = new BeneficiaireUpdatePage();
    expect(await beneficiaireUpdatePage.getPageTitle()).to.eq('archisolverApp.beneficiaire.home.createOrEditLabel');
    await beneficiaireUpdatePage.cancel();
  });

  it('should create and save Beneficiaires', async () => {
    const nbButtonsBeforeCreate = await beneficiaireComponentsPage.countDeleteButtons();

    await beneficiaireComponentsPage.clickOnCreateButton();

    await promise.all([
      beneficiaireUpdatePage.setExterneIdInput('externeId'),
      beneficiaireUpdatePage.getIsActifInput().click(),
      beneficiaireUpdatePage.setDateInscriptionInput('2000-12-31'),
      beneficiaireUpdatePage.setDateResiliationInput('2000-12-31'),
    ]);

    await beneficiaireUpdatePage.save();
    expect(await beneficiaireUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await beneficiaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Beneficiaire', async () => {
    const nbButtonsBeforeDelete = await beneficiaireComponentsPage.countDeleteButtons();
    await beneficiaireComponentsPage.clickOnLastDeleteButton();

    beneficiaireDeleteDialog = new BeneficiaireDeleteDialog();
    expect(await beneficiaireDeleteDialog.getDialogTitle()).to.eq('archisolverApp.beneficiaire.delete.question');
    await beneficiaireDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(beneficiaireComponentsPage.title), 5000);

    expect(await beneficiaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
