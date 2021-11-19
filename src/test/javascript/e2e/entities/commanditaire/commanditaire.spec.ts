import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CommanditaireComponentsPage, CommanditaireDeleteDialog, CommanditaireUpdatePage } from './commanditaire.page-object';

const expect = chai.expect;

describe('Commanditaire e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let commanditaireComponentsPage: CommanditaireComponentsPage;
  let commanditaireUpdatePage: CommanditaireUpdatePage;
  let commanditaireDeleteDialog: CommanditaireDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Commanditaires', async () => {
    await navBarPage.goToEntity('commanditaire');
    commanditaireComponentsPage = new CommanditaireComponentsPage();
    await browser.wait(ec.visibilityOf(commanditaireComponentsPage.title), 5000);
    expect(await commanditaireComponentsPage.getTitle()).to.eq('archisolverApp.commanditaire.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(commanditaireComponentsPage.entities), ec.visibilityOf(commanditaireComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Commanditaire page', async () => {
    await commanditaireComponentsPage.clickOnCreateButton();
    commanditaireUpdatePage = new CommanditaireUpdatePage();
    expect(await commanditaireUpdatePage.getPageTitle()).to.eq('archisolverApp.commanditaire.home.createOrEditLabel');
    await commanditaireUpdatePage.cancel();
  });

  it('should create and save Commanditaires', async () => {
    const nbButtonsBeforeCreate = await commanditaireComponentsPage.countDeleteButtons();

    await commanditaireComponentsPage.clickOnCreateButton();

    await promise.all([
      commanditaireUpdatePage.setIdMetierInterneInput('idMetierInterne'),
      commanditaireUpdatePage.setPrenomInput('prenom'),
      commanditaireUpdatePage.setNomInput('nom'),
      commanditaireUpdatePage.setEmailInput('email'),
      commanditaireUpdatePage.setTelephoneFixeInput('telephoneFixe'),
      commanditaireUpdatePage.setTelephonePortableInput('telephonePortable'),
      commanditaireUpdatePage.setConnuDepuisInput('2000-12-31'),
    ]);

    await commanditaireUpdatePage.save();
    expect(await commanditaireUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await commanditaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Commanditaire', async () => {
    const nbButtonsBeforeDelete = await commanditaireComponentsPage.countDeleteButtons();
    await commanditaireComponentsPage.clickOnLastDeleteButton();

    commanditaireDeleteDialog = new CommanditaireDeleteDialog();
    expect(await commanditaireDeleteDialog.getDialogTitle()).to.eq('archisolverApp.commanditaire.delete.question');
    await commanditaireDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(commanditaireComponentsPage.title), 5000);

    expect(await commanditaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
