import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RefContrainteComponentsPage, RefContrainteDeleteDialog, RefContrainteUpdatePage } from './ref-contrainte.page-object';

const expect = chai.expect;

describe('RefContrainte e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let refContrainteComponentsPage: RefContrainteComponentsPage;
  let refContrainteUpdatePage: RefContrainteUpdatePage;
  let refContrainteDeleteDialog: RefContrainteDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RefContraintes', async () => {
    await navBarPage.goToEntity('ref-contrainte');
    refContrainteComponentsPage = new RefContrainteComponentsPage();
    await browser.wait(ec.visibilityOf(refContrainteComponentsPage.title), 5000);
    expect(await refContrainteComponentsPage.getTitle()).to.eq('archisolverApp.refContrainte.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(refContrainteComponentsPage.entities), ec.visibilityOf(refContrainteComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RefContrainte page', async () => {
    await refContrainteComponentsPage.clickOnCreateButton();
    refContrainteUpdatePage = new RefContrainteUpdatePage();
    expect(await refContrainteUpdatePage.getPageTitle()).to.eq('archisolverApp.refContrainte.home.createOrEditLabel');
    await refContrainteUpdatePage.cancel();
  });

  it('should create and save RefContraintes', async () => {
    const nbButtonsBeforeCreate = await refContrainteComponentsPage.countDeleteButtons();

    await refContrainteComponentsPage.clickOnCreateButton();

    await promise.all([
      refContrainteUpdatePage.setDesignationInput('designation'),
      refContrainteUpdatePage.typeContrainteSelectLastOption(),
      refContrainteUpdatePage.typeDestinationSelectLastOption(),
      refContrainteUpdatePage.setExplicationInput('explication'),
    ]);

    await refContrainteUpdatePage.save();
    expect(await refContrainteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await refContrainteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RefContrainte', async () => {
    const nbButtonsBeforeDelete = await refContrainteComponentsPage.countDeleteButtons();
    await refContrainteComponentsPage.clickOnLastDeleteButton();

    refContrainteDeleteDialog = new RefContrainteDeleteDialog();
    expect(await refContrainteDeleteDialog.getDialogTitle()).to.eq('archisolverApp.refContrainte.delete.question');
    await refContrainteDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(refContrainteComponentsPage.title), 5000);

    expect(await refContrainteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
