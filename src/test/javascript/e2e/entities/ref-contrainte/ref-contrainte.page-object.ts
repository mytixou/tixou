import { element, by, ElementFinder } from 'protractor';

export class RefContrainteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ref-contrainte div table .btn-danger'));
  title = element.all(by.css('jhi-ref-contrainte div h2#page-heading span')).first();
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

export class RefContrainteUpdatePage {
  pageTitle = element(by.id('jhi-ref-contrainte-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  designationInput = element(by.id('field_designation'));
  typeContrainteSelect = element(by.id('field_typeContrainte'));
  typeDestinationSelect = element(by.id('field_typeDestination'));
  explicationInput = element(by.id('field_explication'));

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

  async setTypeContrainteSelect(typeContrainte: string): Promise<void> {
    await this.typeContrainteSelect.sendKeys(typeContrainte);
  }

  async getTypeContrainteSelect(): Promise<string> {
    return await this.typeContrainteSelect.element(by.css('option:checked')).getText();
  }

  async typeContrainteSelectLastOption(): Promise<void> {
    await this.typeContrainteSelect.all(by.tagName('option')).last().click();
  }

  async setTypeDestinationSelect(typeDestination: string): Promise<void> {
    await this.typeDestinationSelect.sendKeys(typeDestination);
  }

  async getTypeDestinationSelect(): Promise<string> {
    return await this.typeDestinationSelect.element(by.css('option:checked')).getText();
  }

  async typeDestinationSelectLastOption(): Promise<void> {
    await this.typeDestinationSelect.all(by.tagName('option')).last().click();
  }

  async setExplicationInput(explication: string): Promise<void> {
    await this.explicationInput.sendKeys(explication);
  }

  async getExplicationInput(): Promise<string> {
    return await this.explicationInput.getAttribute('value');
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

export class RefContrainteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-refContrainte-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-refContrainte'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
