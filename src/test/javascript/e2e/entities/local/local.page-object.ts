import { element, by, ElementFinder } from 'protractor';

export class LocalComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-local div table .btn-danger'));
  title = element.all(by.css('jhi-local div h2#page-heading span')).first();
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

export class LocalUpdatePage {
  pageTitle = element(by.id('jhi-local-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  designationInput = element(by.id('field_designation'));
  surfaceInput = element(by.id('field_surface'));
  etageInput = element(by.id('field_etage'));
  typelocalSelect = element(by.id('field_typelocal'));

  batimentSelect = element(by.id('field_batiment'));

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

  async setSurfaceInput(surface: string): Promise<void> {
    await this.surfaceInput.sendKeys(surface);
  }

  async getSurfaceInput(): Promise<string> {
    return await this.surfaceInput.getAttribute('value');
  }

  async setEtageInput(etage: string): Promise<void> {
    await this.etageInput.sendKeys(etage);
  }

  async getEtageInput(): Promise<string> {
    return await this.etageInput.getAttribute('value');
  }

  async setTypelocalSelect(typelocal: string): Promise<void> {
    await this.typelocalSelect.sendKeys(typelocal);
  }

  async getTypelocalSelect(): Promise<string> {
    return await this.typelocalSelect.element(by.css('option:checked')).getText();
  }

  async typelocalSelectLastOption(): Promise<void> {
    await this.typelocalSelect.all(by.tagName('option')).last().click();
  }

  async batimentSelectLastOption(): Promise<void> {
    await this.batimentSelect.all(by.tagName('option')).last().click();
  }

  async batimentSelectOption(option: string): Promise<void> {
    await this.batimentSelect.sendKeys(option);
  }

  getBatimentSelect(): ElementFinder {
    return this.batimentSelect;
  }

  async getBatimentSelectedOption(): Promise<string> {
    return await this.batimentSelect.element(by.css('option:checked')).getText();
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

export class LocalDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-local-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-local'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
