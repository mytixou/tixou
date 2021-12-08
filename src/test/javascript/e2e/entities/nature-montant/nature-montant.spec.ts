import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NatureMontantComponentsPage, NatureMontantDeleteDialog, NatureMontantUpdatePage } from './nature-montant.page-object';

const expect = chai.expect;

describe('NatureMontant e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let natureMontantComponentsPage: NatureMontantComponentsPage;
  let natureMontantUpdatePage: NatureMontantUpdatePage;
  let natureMontantDeleteDialog: NatureMontantDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NatureMontants', async () => {
    await navBarPage.goToEntity('nature-montant');
    natureMontantComponentsPage = new NatureMontantComponentsPage();
    await browser.wait(ec.visibilityOf(natureMontantComponentsPage.title), 5000);
    expect(await natureMontantComponentsPage.getTitle()).to.eq('archisolverApp.natureMontant.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(natureMontantComponentsPage.entities), ec.visibilityOf(natureMontantComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NatureMontant page', async () => {
    await natureMontantComponentsPage.clickOnCreateButton();
    natureMontantUpdatePage = new NatureMontantUpdatePage();
    expect(await natureMontantUpdatePage.getPageTitle()).to.eq('archisolverApp.natureMontant.home.createOrEditLabel');
    await natureMontantUpdatePage.cancel();
  });

  it('should create and save NatureMontants', async () => {
    const nbButtonsBeforeCreate = await natureMontantComponentsPage.countDeleteButtons();

    await natureMontantComponentsPage.clickOnCreateButton();

    await promise.all([
      natureMontantUpdatePage.setCodeInput('code'),
      natureMontantUpdatePage.setLibelleInput('libelle'),
      natureMontantUpdatePage.setDescriptionInput('description'),
      natureMontantUpdatePage.strategieSelectLastOption(),
      natureMontantUpdatePage.strategieSelectLastOption(),
      natureMontantUpdatePage.strategieSelectLastOption(),
      natureMontantUpdatePage.strategieSelectLastOption(),
    ]);

    await natureMontantUpdatePage.save();
    expect(await natureMontantUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await natureMontantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last NatureMontant', async () => {
    const nbButtonsBeforeDelete = await natureMontantComponentsPage.countDeleteButtons();
    await natureMontantComponentsPage.clickOnLastDeleteButton();

    natureMontantDeleteDialog = new NatureMontantDeleteDialog();
    expect(await natureMontantDeleteDialog.getDialogTitle()).to.eq('archisolverApp.natureMontant.delete.question');
    await natureMontantDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(natureMontantComponentsPage.title), 5000);

    expect(await natureMontantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
