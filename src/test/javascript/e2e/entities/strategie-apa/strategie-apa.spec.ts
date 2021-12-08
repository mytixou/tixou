import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StrategieApaComponentsPage, StrategieApaDeleteDialog, StrategieApaUpdatePage } from './strategie-apa.page-object';

const expect = chai.expect;

describe('StrategieApa e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let strategieApaComponentsPage: StrategieApaComponentsPage;
  let strategieApaUpdatePage: StrategieApaUpdatePage;
  let strategieApaDeleteDialog: StrategieApaDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load StrategieApas', async () => {
    await navBarPage.goToEntity('strategie-apa');
    strategieApaComponentsPage = new StrategieApaComponentsPage();
    await browser.wait(ec.visibilityOf(strategieApaComponentsPage.title), 5000);
    expect(await strategieApaComponentsPage.getTitle()).to.eq('archisolverApp.strategieApa.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(strategieApaComponentsPage.entities), ec.visibilityOf(strategieApaComponentsPage.noResult)),
      1000
    );
  });

  it('should load create StrategieApa page', async () => {
    await strategieApaComponentsPage.clickOnCreateButton();
    strategieApaUpdatePage = new StrategieApaUpdatePage();
    expect(await strategieApaUpdatePage.getPageTitle()).to.eq('archisolverApp.strategieApa.home.createOrEditLabel');
    await strategieApaUpdatePage.cancel();
  });

  it('should create and save StrategieApas', async () => {
    const nbButtonsBeforeCreate = await strategieApaComponentsPage.countDeleteButtons();

    await strategieApaComponentsPage.clickOnCreateButton();

    await promise.all([
      strategieApaUpdatePage.getIsActifInput().click(),
      strategieApaUpdatePage.setAnneInput('5'),
      strategieApaUpdatePage.setMontantPlafondInput('5'),
      strategieApaUpdatePage.setNbPlafondheureInput('5'),
      strategieApaUpdatePage.setTauxInput('5'),
      strategieApaUpdatePage.aideSelectLastOption(),
    ]);

    await strategieApaUpdatePage.save();
    expect(await strategieApaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await strategieApaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last StrategieApa', async () => {
    const nbButtonsBeforeDelete = await strategieApaComponentsPage.countDeleteButtons();
    await strategieApaComponentsPage.clickOnLastDeleteButton();

    strategieApaDeleteDialog = new StrategieApaDeleteDialog();
    expect(await strategieApaDeleteDialog.getDialogTitle()).to.eq('archisolverApp.strategieApa.delete.question');
    await strategieApaDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(strategieApaComponentsPage.title), 5000);

    expect(await strategieApaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
