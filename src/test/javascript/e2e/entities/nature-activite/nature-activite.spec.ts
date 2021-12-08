import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NatureActiviteComponentsPage, NatureActiviteDeleteDialog, NatureActiviteUpdatePage } from './nature-activite.page-object';

const expect = chai.expect;

describe('NatureActivite e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let natureActiviteComponentsPage: NatureActiviteComponentsPage;
  let natureActiviteUpdatePage: NatureActiviteUpdatePage;
  let natureActiviteDeleteDialog: NatureActiviteDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NatureActivites', async () => {
    await navBarPage.goToEntity('nature-activite');
    natureActiviteComponentsPage = new NatureActiviteComponentsPage();
    await browser.wait(ec.visibilityOf(natureActiviteComponentsPage.title), 5000);
    expect(await natureActiviteComponentsPage.getTitle()).to.eq('archisolverApp.natureActivite.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(natureActiviteComponentsPage.entities), ec.visibilityOf(natureActiviteComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NatureActivite page', async () => {
    await natureActiviteComponentsPage.clickOnCreateButton();
    natureActiviteUpdatePage = new NatureActiviteUpdatePage();
    expect(await natureActiviteUpdatePage.getPageTitle()).to.eq('archisolverApp.natureActivite.home.createOrEditLabel');
    await natureActiviteUpdatePage.cancel();
  });

  it('should create and save NatureActivites', async () => {
    const nbButtonsBeforeCreate = await natureActiviteComponentsPage.countDeleteButtons();

    await natureActiviteComponentsPage.clickOnCreateButton();

    await promise.all([
      natureActiviteUpdatePage.setCodeInput('code'),
      natureActiviteUpdatePage.setLibelleInput('libelle'),
      natureActiviteUpdatePage.setDescriptionInput('description'),
      natureActiviteUpdatePage.strategieSelectLastOption(),
      natureActiviteUpdatePage.strategieSelectLastOption(),
      natureActiviteUpdatePage.strategieSelectLastOption(),
      natureActiviteUpdatePage.strategieSelectLastOption(),
    ]);

    await natureActiviteUpdatePage.save();
    expect(await natureActiviteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await natureActiviteComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last NatureActivite', async () => {
    const nbButtonsBeforeDelete = await natureActiviteComponentsPage.countDeleteButtons();
    await natureActiviteComponentsPage.clickOnLastDeleteButton();

    natureActiviteDeleteDialog = new NatureActiviteDeleteDialog();
    expect(await natureActiviteDeleteDialog.getDialogTitle()).to.eq('archisolverApp.natureActivite.delete.question');
    await natureActiviteDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(natureActiviteComponentsPage.title), 5000);

    expect(await natureActiviteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
