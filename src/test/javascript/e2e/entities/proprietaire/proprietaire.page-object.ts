import { element, by, ElementFinder } from 'protractor';

export class ProprietaireComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-proprietaire div table .btn-danger'));
  title = element.all(by.css('jhi-proprietaire div h2#page-heading span')).first();
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

export class ProprietaireUpdatePage {
  pageTitle = element(by.id('jhi-proprietaire-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  prenomInput = element(by.id('field_prenom'));
  nomInput = element(by.id('field_nom'));
  emailInput = element(by.id('field_email'));
  telephoneFixeInput = element(by.id('field_telephoneFixe'));
  telephonePortableInput = element(by.id('field_telephonePortable'));
  depuisInput = element(by.id('field_depuis'));
  habiteLocalInput = element(by.id('field_habiteLocal'));
  finLeInput = element(by.id('field_finLe'));

  localSelect = element(by.id('field_local'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setPrenomInput(prenom: string): Promise<void> {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput(): Promise<string> {
    return await this.prenomInput.getAttribute('value');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setTelephoneFixeInput(telephoneFixe: string): Promise<void> {
    await this.telephoneFixeInput.sendKeys(telephoneFixe);
  }

  async getTelephoneFixeInput(): Promise<string> {
    return await this.telephoneFixeInput.getAttribute('value');
  }

  async setTelephonePortableInput(telephonePortable: string): Promise<void> {
    await this.telephonePortableInput.sendKeys(telephonePortable);
  }

  async getTelephonePortableInput(): Promise<string> {
    return await this.telephonePortableInput.getAttribute('value');
  }

  async setDepuisInput(depuis: string): Promise<void> {
    await this.depuisInput.sendKeys(depuis);
  }

  async getDepuisInput(): Promise<string> {
    return await this.depuisInput.getAttribute('value');
  }

  getHabiteLocalInput(): ElementFinder {
    return this.habiteLocalInput;
  }

  async setFinLeInput(finLe: string): Promise<void> {
    await this.finLeInput.sendKeys(finLe);
  }

  async getFinLeInput(): Promise<string> {
    return await this.finLeInput.getAttribute('value');
  }

  async localSelectLastOption(): Promise<void> {
    await this.localSelect.all(by.tagName('option')).last().click();
  }

  async localSelectOption(option: string): Promise<void> {
    await this.localSelect.sendKeys(option);
  }

  getLocalSelect(): ElementFinder {
    return this.localSelect;
  }

  async getLocalSelectedOption(): Promise<string> {
    return await this.localSelect.element(by.css('option:checked')).getText();
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

export class ProprietaireDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-proprietaire-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-proprietaire'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
