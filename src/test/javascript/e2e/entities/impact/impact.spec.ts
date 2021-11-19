import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ImpactComponentsPage, ImpactDeleteDialog, ImpactUpdatePage } from './impact.page-object';

const expect = chai.expect;

describe('Impact e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let impactComponentsPage: ImpactComponentsPage;
  let impactUpdatePage: ImpactUpdatePage;
  let impactDeleteDialog: ImpactDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Impacts', async () => {
    await navBarPage.goToEntity('impact');
    impactComponentsPage = new ImpactComponentsPage();
    await browser.wait(ec.visibilityOf(impactComponentsPage.title), 5000);
    expect(await impactComponentsPage.getTitle()).to.eq('archisolverApp.impact.home.title');
    await browser.wait(ec.or(ec.visibilityOf(impactComponentsPage.entities), ec.visibilityOf(impactComponentsPage.noResult)), 1000);
  });

  it('should load create Impact page', async () => {
    await impactComponentsPage.clickOnCreateButton();
    impactUpdatePage = new ImpactUpdatePage();
    expect(await impactUpdatePage.getPageTitle()).to.eq('archisolverApp.impact.home.createOrEditLabel');
    await impactUpdatePage.cancel();
  });

  it('should create and save Impacts', async () => {
    const nbButtonsBeforeCreate = await impactComponentsPage.countDeleteButtons();

    await impactComponentsPage.clickOnCreateButton();

    await promise.all([
      impactUpdatePage.setDesignationInput('designation'),
      impactUpdatePage.setExplicationInput('explication'),
      impactUpdatePage.typeImpactSelectLastOption(),
      impactUpdatePage.reponseSelectLastOption(),
    ]);

    await impactUpdatePage.save();
    expect(await impactUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await impactComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Impact', async () => {
    const nbButtonsBeforeDelete = await impactComponentsPage.countDeleteButtons();
    await impactComponentsPage.clickOnLastDeleteButton();

    impactDeleteDialog = new ImpactDeleteDialog();
    expect(await impactDeleteDialog.getDialogTitle()).to.eq('archisolverApp.impact.delete.question');
    await impactDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(impactComponentsPage.title), 5000);

    expect(await impactComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
