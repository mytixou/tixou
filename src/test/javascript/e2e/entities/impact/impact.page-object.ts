import { element, by, ElementFinder } from 'protractor';

export class ImpactComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-impact div table .btn-danger'));
  title = element.all(by.css('jhi-impact div h2#page-heading span')).first();
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

export class ImpactUpdatePage {
  pageTitle = element(by.id('jhi-impact-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  designationInput = element(by.id('field_designation'));
  explicationInput = element(by.id('field_explication'));
  typeImpactSelect = element(by.id('field_typeImpact'));

  reponseSelect = element(by.id('field_reponse'));

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

  async setTypeImpactSelect(typeImpact: string): Promise<void> {
    await this.typeImpactSelect.sendKeys(typeImpact);
  }

  async getTypeImpactSelect(): Promise<string> {
    return await this.typeImpactSelect.element(by.css('option:checked')).getText();
  }

  async typeImpactSelectLastOption(): Promise<void> {
    await this.typeImpactSelect.all(by.tagName('option')).last().click();
  }

  async reponseSelectLastOption(): Promise<void> {
    await this.reponseSelect.all(by.tagName('option')).last().click();
  }

  async reponseSelectOption(option: string): Promise<void> {
    await this.reponseSelect.sendKeys(option);
  }

  getReponseSelect(): ElementFinder {
    return this.reponseSelect;
  }

  async getReponseSelectedOption(): Promise<string> {
    return await this.reponseSelect.element(by.css('option:checked')).getText();
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

export class ImpactDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-impact-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-impact'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
