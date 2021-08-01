import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ChoixReponseComponentsPage, ChoixReponseDeleteDialog, ChoixReponseUpdatePage } from './choix-reponse.page-object';

const expect = chai.expect;

describe('ChoixReponse e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let choixReponseComponentsPage: ChoixReponseComponentsPage;
  let choixReponseUpdatePage: ChoixReponseUpdatePage;
  let choixReponseDeleteDialog: ChoixReponseDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ChoixReponses', async () => {
    await navBarPage.goToEntity('choix-reponse');
    choixReponseComponentsPage = new ChoixReponseComponentsPage();
    await browser.wait(ec.visibilityOf(choixReponseComponentsPage.title), 5000);
    expect(await choixReponseComponentsPage.getTitle()).to.eq('archisolverApp.choixReponse.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(choixReponseComponentsPage.entities), ec.visibilityOf(choixReponseComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ChoixReponse page', async () => {
    await choixReponseComponentsPage.clickOnCreateButton();
    choixReponseUpdatePage = new ChoixReponseUpdatePage();
    expect(await choixReponseUpdatePage.getPageTitle()).to.eq('archisolverApp.choixReponse.home.createOrEditLabel');
    await choixReponseUpdatePage.cancel();
  });

  it('should create and save ChoixReponses', async () => {
    const nbButtonsBeforeCreate = await choixReponseComponentsPage.countDeleteButtons();

    await choixReponseComponentsPage.clickOnCreateButton();

    await promise.all([
      choixReponseUpdatePage.setDateChoixInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      choixReponseUpdatePage.dossierSelectLastOption(),
      choixReponseUpdatePage.reponseSelectLastOption(),
    ]);

    await choixReponseUpdatePage.save();
    expect(await choixReponseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await choixReponseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ChoixReponse', async () => {
    const nbButtonsBeforeDelete = await choixReponseComponentsPage.countDeleteButtons();
    await choixReponseComponentsPage.clickOnLastDeleteButton();

    choixReponseDeleteDialog = new ChoixReponseDeleteDialog();
    expect(await choixReponseDeleteDialog.getDialogTitle()).to.eq('archisolverApp.choixReponse.delete.question');
    await choixReponseDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(choixReponseComponentsPage.title), 5000);

    expect(await choixReponseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
