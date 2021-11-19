import { element, by, ElementFinder } from 'protractor';

export class QuestionnaireComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-questionnaire div table .btn-danger'));
  title = element.all(by.css('jhi-questionnaire div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class QuestionnaireUpdatePage {
  pageTitle = element(by.id('jhi-questionnaire-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  designationInput = element(by.id('field_designation'));
  explicationInput = element(by.id('field_explication'));
  typeQuestionnaireSelect = element(by.id('field_typeQuestionnaire'));

  dossierSelect = element(by.id('field_dossier'));
  questionSelect = element(by.id('field_question'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setDesignationInput(designation: string): Promise<void> {
    await this.designationInput.sendKeys(designation);
  }

  async getDesignationInput(): Promise<string> {
    return await this.designationInput.getAttribute('value');
  }

  async setExplicationInput(explication: string): Promise<void> {
    await this.explicationInput.sendKeys(explication);
  }

  async getExplicationInput(): Promise<string> {
    return await this.explicationInput.getAttribute('value');
  }

  async setTypeQuestionnaireSelect(typeQuestionnaire: string): Promise<void> {
    await this.typeQuestionnaireSelect.sendKeys(typeQuestionnaire);
  }

  async getTypeQuestionnaireSelect(): Promise<string> {
    return await this.typeQuestionnaireSelect.element(by.css('option:checked')).getText();
  }

  async typeQuestionnaireSelectLastOption(): Promise<void> {
    await this.typeQuestionnaireSelect.all(by.tagName('option')).last().click();
  }

  async dossierSelectLastOption(): Promise<void> {
    await this.dossierSelect.all(by.tagName('option')).last().click();
  }

  async dossierSelectOption(option: string): Promise<void> {
    await this.dossierSelect.sendKeys(option);
  }

  getDossierSelect(): ElementFinder {
    return this.dossierSelect;
  }

  async getDossierSelectedOption(): Promise<string> {
    return await this.dossierSelect.element(by.css('option:checked')).getText();
  }

  async questionSelectLastOption(): Promise<void> {
    await this.questionSelect.all(by.tagName('option')).last().click();
  }

  async questionSelectOption(option: string): Promise<void> {
    await this.questionSelect.sendKeys(option);
  }

  getQuestionSelect(): ElementFinder {
    return this.questionSelect;
  }

  async getQuestionSelectedOption(): Promise<string> {
    return await this.questionSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class QuestionnaireDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-questionnaire-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-questionnaire'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
