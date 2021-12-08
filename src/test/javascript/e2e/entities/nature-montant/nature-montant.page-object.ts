import { element, by, ElementFinder } from 'protractor';

export class NatureMontantComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-nature-montant div table .btn-danger'));
  title = element.all(by.css('jhi-nature-montant div h2#page-heading span')).first();
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

export class NatureMontantUpdatePage {
  pageTitle = element(by.id('jhi-nature-montant-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  codeInput = element(by.id('field_code'));
  libelleInput = element(by.id('field_libelle'));
  descriptionInput = element(by.id('field_description'));

  strategieSelect = element(by.id('field_strategie'));
  strategieSelect = element(by.id('field_strategie'));
  strategieSelect = element(by.id('field_strategie'));
  strategieSelect = element(by.id('field_strategie'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setCodeInput(code: string): Promise<void> {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput(): Promise<string> {
    return await this.codeInput.getAttribute('value');
  }

  async setLibelleInput(libelle: string): Promise<void> {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput(): Promise<string> {
    return await this.libelleInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async strategieSelectLastOption(): Promise<void> {
    await this.strategieSelect.all(by.tagName('option')).last().click();
  }

  async strategieSelectOption(option: string): Promise<void> {
    await this.strategieSelect.sendKeys(option);
  }

  getStrategieSelect(): ElementFinder {
    return this.strategieSelect;
  }

  async getStrategieSelectedOption(): Promise<string> {
    return await this.strategieSelect.element(by.css('option:checked')).getText();
  }

  async strategieSelectLastOption(): Promise<void> {
    await this.strategieSelect.all(by.tagName('option')).last().click();
  }

  async strategieSelectOption(option: string): Promise<void> {
    await this.strategieSelect.sendKeys(option);
  }

  getStrategieSelect(): ElementFinder {
    return this.strategieSelect;
  }

  async getStrategieSelectedOption(): Promise<string> {
    return await this.strategieSelect.element(by.css('option:checked')).getText();
  }

  async strategieSelectLastOption(): Promise<void> {
    await this.strategieSelect.all(by.tagName('option')).last().click();
  }

  async strategieSelectOption(option: string): Promise<void> {
    await this.strategieSelect.sendKeys(option);
  }

  getStrategieSelect(): ElementFinder {
    return this.strategieSelect;
  }

  async getStrategieSelectedOption(): Promise<string> {
    return await this.strategieSelect.element(by.css('option:checked')).getText();
  }

  async strategieSelectLastOption(): Promise<void> {
    await this.strategieSelect.all(by.tagName('option')).last().click();
  }

  async strategieSelectOption(option: string): Promise<void> {
    await this.strategieSelect.sendKeys(option);
  }

  getStrategieSelect(): ElementFinder {
    return this.strategieSelect;
  }

  async getStrategieSelectedOption(): Promise<string> {
    return await this.strategieSelect.element(by.css('option:checked')).getText();
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

export class NatureMontantDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-natureMontant-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-natureMontant'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
