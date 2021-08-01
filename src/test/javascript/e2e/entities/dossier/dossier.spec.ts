import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DossierComponentsPage, DossierDeleteDialog, DossierUpdatePage } from './dossier.page-object';

const expect = chai.expect;

describe('Dossier e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dossierComponentsPage: DossierComponentsPage;
  let dossierUpdatePage: DossierUpdatePage;
  let dossierDeleteDialog: DossierDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Dossiers', async () => {
    await navBarPage.goToEntity('dossier');
    dossierComponentsPage = new DossierComponentsPage();
    await browser.wait(ec.visibilityOf(dossierComponentsPage.title), 5000);
    expect(await dossierComponentsPage.getTitle()).to.eq('archisolverApp.dossier.home.title');
    await browser.wait(ec.or(ec.visibilityOf(dossierComponentsPage.entities), ec.visibilityOf(dossierComponentsPage.noResult)), 1000);
  });

  it('should load create Dossier page', async () => {
    await dossierComponentsPage.clickOnCreateButton();
    dossierUpdatePage = new DossierUpdatePage();
    expect(await dossierUpdatePage.getPageTitle()).to.eq('archisolverApp.dossier.home.createOrEditLabel');
    await dossierUpdatePage.cancel();
  });

  it('should create and save Dossiers', async () => {
    const nbButtonsBeforeCreate = await dossierComponentsPage.countDeleteButtons();

    await dossierComponentsPage.clickOnCreateButton();

    await promise.all([
      dossierUpdatePage.setDesignationInput('designation'),
      dossierUpdatePage.setDescriptionInput('description'),
      dossierUpdatePage.setDateCreationInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      dossierUpdatePage.setDateClotureInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      dossierUpdatePage.commanditaireSelectLastOption(),
    ]);

    await dossierUpdatePage.save();
    expect(await dossierUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await dossierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Dossier', async () => {
    const nbButtonsBeforeDelete = await dossierComponentsPage.countDeleteButtons();
    await dossierComponentsPage.clickOnLastDeleteButton();

    dossierDeleteDialog = new DossierDeleteDialog();
    expect(await dossierDeleteDialog.getDialogTitle()).to.eq('archisolverApp.dossier.delete.question');
    await dossierDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(dossierComponentsPage.title), 5000);

    expect(await dossierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
