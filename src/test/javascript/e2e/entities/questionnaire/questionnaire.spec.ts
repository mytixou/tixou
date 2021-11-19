import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { QuestionnaireComponentsPage, QuestionnaireDeleteDialog, QuestionnaireUpdatePage } from './questionnaire.page-object';

const expect = chai.expect;

describe('Questionnaire e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let questionnaireComponentsPage: QuestionnaireComponentsPage;
  let questionnaireUpdatePage: QuestionnaireUpdatePage;
  let questionnaireDeleteDialog: QuestionnaireDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Questionnaires', async () => {
    await navBarPage.goToEntity('questionnaire');
    questionnaireComponentsPage = new QuestionnaireComponentsPage();
    await browser.wait(ec.visibilityOf(questionnaireComponentsPage.title), 5000);
    expect(await questionnaireComponentsPage.getTitle()).to.eq('archisolverApp.questionnaire.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(questionnaireComponentsPage.entities), ec.visibilityOf(questionnaireComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Questionnaire page', async () => {
    await questionnaireComponentsPage.clickOnCreateButton();
    questionnaireUpdatePage = new QuestionnaireUpdatePage();
    expect(await questionnaireUpdatePage.getPageTitle()).to.eq('archisolverApp.questionnaire.home.createOrEditLabel');
    await questionnaireUpdatePage.cancel();
  });

  it('should create and save Questionnaires', async () => {
    const nbButtonsBeforeCreate = await questionnaireComponentsPage.countDeleteButtons();

    await questionnaireComponentsPage.clickOnCreateButton();

    await promise.all([
      questionnaireUpdatePage.setDesignationInput('designation'),
      questionnaireUpdatePage.setExplicationInput('explication'),
      questionnaireUpdatePage.typeQuestionnaireSelectLastOption(),
      questionnaireUpdatePage.dossierSelectLastOption(),
      // questionnaireUpdatePage.questionSelectLastOption(),
    ]);

    await questionnaireUpdatePage.save();
    expect(await questionnaireUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await questionnaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Questionnaire', async () => {
    const nbButtonsBeforeDelete = await questionnaireComponentsPage.countDeleteButtons();
    await questionnaireComponentsPage.clickOnLastDeleteButton();

    questionnaireDeleteDialog = new QuestionnaireDeleteDialog();
    expect(await questionnaireDeleteDialog.getDialogTitle()).to.eq('archisolverApp.questionnaire.delete.question');
    await questionnaireDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(questionnaireComponentsPage.title), 5000);

    expect(await questionnaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
