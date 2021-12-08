import { element, by, ElementFinder } from 'protractor';

export class BeneficiaireComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-beneficiaire div table .btn-danger'));
  title = element.all(by.css('jhi-beneficiaire div h2#page-heading span')).first();
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

export class BeneficiaireUpdatePage {
  pageTitle = element(by.id('jhi-beneficiaire-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  externeIdInput = element(by.id('field_externeId'));
  isActifInput = element(by.id('field_isActif'));
  dateInscriptionInput = element(by.id('field_dateInscription'));
  dateResiliationInput = element(by.id('field_dateResiliation'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setExterneIdInput(externeId: string): Promise<void> {
    await this.externeIdInput.sendKeys(externeId);
  }

  async getExterneIdInput(): Promise<string> {
    return await this.externeIdInput.getAttribute('value');
  }

  getIsActifInput(): ElementFinder {
    return this.isActifInput;
  }

  async setDateInscriptionInput(dateInscription: string): Promise<void> {
    await this.dateInscriptionInput.sendKeys(dateInscription);
  }

  async getDateInscriptionInput(): Promise<string> {
    return await this.dateInscriptionInput.getAttribute('value');
  }

  async setDateResiliationInput(dateResiliation: string): Promise<void> {
    await this.dateResiliationInput.sendKeys(dateResiliation);
  }

  async getDateResiliationInput(): Promise<string> {
    return await this.dateResiliationInput.getAttribute('value');
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

export class BeneficiaireDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-beneficiaire-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-beneficiaire'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
