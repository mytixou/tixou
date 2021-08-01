import { element, by, ElementFinder } from 'protractor';

export class TerrainComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-terrain div table .btn-danger'));
  title = element.all(by.css('jhi-terrain div h2#page-heading span')).first();
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

export class TerrainUpdatePage {
  pageTitle = element(by.id('jhi-terrain-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  parcelleInput = element(by.id('field_parcelle'));
  surfaceInput = element(by.id('field_surface'));

  adresseSelect = element(by.id('field_adresse'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setParcelleInput(parcelle: string): Promise<void> {
    await this.parcelleInput.sendKeys(parcelle);
  }

  async getParcelleInput(): Promise<string> {
    return await this.parcelleInput.getAttribute('value');
  }

  async setSurfaceInput(surface: string): Promise<void> {
    await this.surfaceInput.sendKeys(surface);
  }

  async getSurfaceInput(): Promise<string> {
    return await this.surfaceInput.getAttribute('value');
  }

  async adresseSelectLastOption(): Promise<void> {
    await this.adresseSelect.all(by.tagName('option')).last().click();
  }

  async adresseSelectOption(option: string): Promise<void> {
    await this.adresseSelect.sendKeys(option);
  }

  getAdresseSelect(): ElementFinder {
    return this.adresseSelect;
  }

  async getAdresseSelectedOption(): Promise<string> {
    return await this.adresseSelect.element(by.css('option:checked')).getText();
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

export class TerrainDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-terrain-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-terrain'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
