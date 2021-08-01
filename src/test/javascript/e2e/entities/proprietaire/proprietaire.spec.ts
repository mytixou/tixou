import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProprietaireComponentsPage, ProprietaireDeleteDialog, ProprietaireUpdatePage } from './proprietaire.page-object';

const expect = chai.expect;

describe('Proprietaire e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let proprietaireComponentsPage: ProprietaireComponentsPage;
  let proprietaireUpdatePage: ProprietaireUpdatePage;
  let proprietaireDeleteDialog: ProprietaireDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Proprietaires', async () => {
    await navBarPage.goToEntity('proprietaire');
    proprietaireComponentsPage = new ProprietaireComponentsPage();
    await browser.wait(ec.visibilityOf(proprietaireComponentsPage.title), 5000);
    expect(await proprietaireComponentsPage.getTitle()).to.eq('archisolverApp.proprietaire.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(proprietaireComponentsPage.entities), ec.visibilityOf(proprietaireComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Proprietaire page', async () => {
    await proprietaireComponentsPage.clickOnCreateButton();
    proprietaireUpdatePage = new ProprietaireUpdatePage();
    expect(await proprietaireUpdatePage.getPageTitle()).to.eq('archisolverApp.proprietaire.home.createOrEditLabel');
    await proprietaireUpdatePage.cancel();
  });

  it('should create and save Proprietaires', async () => {
    const nbButtonsBeforeCreate = await proprietaireComponentsPage.countDeleteButtons();

    await proprietaireComponentsPage.clickOnCreateButton();

    await promise.all([
      proprietaireUpdatePage.setPrenomInput('prenom'),
      proprietaireUpdatePage.setNomInput('nom'),
      proprietaireUpdatePage.setEmailInput('email'),
      proprietaireUpdatePage.setTelephoneFixeInput('telephoneFixe'),
      proprietaireUpdatePage.setTelephonePortableInput('telephonePortable'),
      proprietaireUpdatePage.setDepuisInput('2000-12-31'),
      proprietaireUpdatePage.getHabiteLocalInput().click(),
      proprietaireUpdatePage.setFinLeInput('2000-12-31'),
      // proprietaireUpdatePage.localSelectLastOption(),
    ]);

    await proprietaireUpdatePage.save();
    expect(await proprietaireUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await proprietaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Proprietaire', async () => {
    const nbButtonsBeforeDelete = await proprietaireComponentsPage.countDeleteButtons();
    await proprietaireComponentsPage.clickOnLastDeleteButton();

    proprietaireDeleteDialog = new ProprietaireDeleteDialog();
    expect(await proprietaireDeleteDialog.getDialogTitle()).to.eq('archisolverApp.proprietaire.delete.question');
    await proprietaireDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(proprietaireComponentsPage.title), 5000);

    expect(await proprietaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
