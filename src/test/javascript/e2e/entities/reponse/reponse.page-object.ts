import { element, by, ElementFinder } from 'protractor';

export class ReponseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-reponse div table .btn-danger'));
  title = element.all(by.css('jhi-reponse div h2#page-heading span')).first();
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

export class ReponseUpdatePage {
  pageTitle = element(by.id('jhi-reponse-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  designationInput = element(by.id('field_designation'));
  explicationInput = element(by.id('field_explication'));
  typeQuestionSelect = element(by.id('field_typeQuestion'));

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

  async setTypeQuestionSelect(typeQuestion: string): Promise<void> {
    await this.typeQuestionSelect.sendKeys(typeQuestion);
  }

  async getTypeQuestionSelect(): Promise<string> {
    return await this.typeQuestionSelect.element(by.css('option:checked')).getText();
  }

  async typeQuestionSelectLastOption(): Promise<void> {
    await this.typeQuestionSelect.all(by.tagName('option')).last().click();
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

export class ReponseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-reponse-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-reponse'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
