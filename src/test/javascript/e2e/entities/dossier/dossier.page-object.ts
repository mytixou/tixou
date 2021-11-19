import { element, by, ElementFinder } from 'protractor';

export class DossierComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-dossier div table .btn-danger'));
  title = element.all(by.css('jhi-dossier div h2#page-heading span')).first();
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

export class DossierUpdatePage {
  pageTitle = element(by.id('jhi-dossier-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  designationInput = element(by.id('field_designation'));
  descriptionInput = element(by.id('field_description'));
  dateCreationInput = element(by.id('field_dateCreation'));
  dateClotureInput = element(by.id('field_dateCloture'));

  commanditaireSelect = element(by.id('field_commanditaire'));

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

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setDateCreationInput(dateCreation: string): Promise<void> {
    await this.dateCreationInput.sendKeys(dateCreation);
  }

  async getDateCreationInput(): Promise<string> {
    return await this.dateCreationInput.getAttribute('value');
  }

  async setDateClotureInput(dateCloture: string): Promise<void> {
    await this.dateClotureInput.sendKeys(dateCloture);
  }

  async getDateClotureInput(): Promise<string> {
    return await this.dateClotureInput.getAttribute('value');
  }

  async commanditaireSelectLastOption(): Promise<void> {
    await this.commanditaireSelect.all(by.tagName('option')).last().click();
  }

  async commanditaireSelectOption(option: string): Promise<void> {
    await this.commanditaireSelect.sendKeys(option);
  }

  getCommanditaireSelect(): ElementFinder {
    return this.commanditaireSelect;
  }

  async getCommanditaireSelectedOption(): Promise<string> {
    return await this.commanditaireSelect.element(by.css('option:checked')).getText();
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

export class DossierDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-dossier-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-dossier'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
