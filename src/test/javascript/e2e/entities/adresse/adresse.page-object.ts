import { element, by, ElementFinder } from 'protractor';

export class AdresseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-adresse div table .btn-danger'));
  title = element.all(by.css('jhi-adresse div h2#page-heading span')).first();
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

export class AdresseUpdatePage {
  pageTitle = element(by.id('jhi-adresse-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  adresseLigne1Input = element(by.id('field_adresseLigne1'));
  adresseLigne2Input = element(by.id('field_adresseLigne2'));
  codePostalInput = element(by.id('field_codePostal'));
  villeInput = element(by.id('field_ville'));
  stateProvinceInput = element(by.id('field_stateProvince'));

  departementSelect = element(by.id('field_departement'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setAdresseLigne1Input(adresseLigne1: string): Promise<void> {
    await this.adresseLigne1Input.sendKeys(adresseLigne1);
  }

  async getAdresseLigne1Input(): Promise<string> {
    return await this.adresseLigne1Input.getAttribute('value');
  }

  async setAdresseLigne2Input(adresseLigne2: string): Promise<void> {
    await this.adresseLigne2Input.sendKeys(adresseLigne2);
  }

  async getAdresseLigne2Input(): Promise<string> {
    return await this.adresseLigne2Input.getAttribute('value');
  }

  async setCodePostalInput(codePostal: string): Promise<void> {
    await this.codePostalInput.sendKeys(codePostal);
  }

  async getCodePostalInput(): Promise<string> {
    return await this.codePostalInput.getAttribute('value');
  }

  async setVilleInput(ville: string): Promise<void> {
    await this.villeInput.sendKeys(ville);
  }

  async getVilleInput(): Promise<string> {
    return await this.villeInput.getAttribute('value');
  }

  async setStateProvinceInput(stateProvince: string): Promise<void> {
    await this.stateProvinceInput.sendKeys(stateProvince);
  }

  async getStateProvinceInput(): Promise<string> {
    return await this.stateProvinceInput.getAttribute('value');
  }

  async departementSelectLastOption(): Promise<void> {
    await this.departementSelect.all(by.tagName('option')).last().click();
  }

  async departementSelectOption(option: string): Promise<void> {
    await this.departementSelect.sendKeys(option);
  }

  getDepartementSelect(): ElementFinder {
    return this.departementSelect;
  }

  async getDepartementSelectedOption(): Promise<string> {
    return await this.departementSelect.element(by.css('option:checked')).getText();
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

export class AdresseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adresse-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adresse'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
