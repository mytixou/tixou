import { element, by, ElementFinder } from 'protractor';

export class BatimentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-batiment div table .btn-danger'));
  title = element.all(by.css('jhi-batiment div h2#page-heading span')).first();
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

export class BatimentUpdatePage {
  pageTitle = element(by.id('jhi-batiment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nomInput = element(by.id('field_nom'));
  empriseInput = element(by.id('field_emprise'));
  hauteurInput = element(by.id('field_hauteur'));
  etagesInput = element(by.id('field_etages'));

  terrainSelect = element(by.id('field_terrain'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setEmpriseInput(emprise: string): Promise<void> {
    await this.empriseInput.sendKeys(emprise);
  }

  async getEmpriseInput(): Promise<string> {
    return await this.empriseInput.getAttribute('value');
  }

  async setHauteurInput(hauteur: string): Promise<void> {
    await this.hauteurInput.sendKeys(hauteur);
  }

  async getHauteurInput(): Promise<string> {
    return await this.hauteurInput.getAttribute('value');
  }

  async setEtagesInput(etages: string): Promise<void> {
    await this.etagesInput.sendKeys(etages);
  }

  async getEtagesInput(): Promise<string> {
    return await this.etagesInput.getAttribute('value');
  }

  async terrainSelectLastOption(): Promise<void> {
    await this.terrainSelect.all(by.tagName('option')).last().click();
  }

  async terrainSelectOption(option: string): Promise<void> {
    await this.terrainSelect.sendKeys(option);
  }

  getTerrainSelect(): ElementFinder {
    return this.terrainSelect;
  }

  async getTerrainSelectedOption(): Promise<string> {
    return await this.terrainSelect.element(by.css('option:checked')).getText();
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

export class BatimentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-batiment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-batiment'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
