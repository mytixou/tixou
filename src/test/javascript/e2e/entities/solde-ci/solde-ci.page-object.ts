import { element, by, ElementFinder } from 'protractor';

export class SoldeCiComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-solde-ci div table .btn-danger'));
  title = element.all(by.css('jhi-solde-ci div h2#page-heading span')).first();
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

export class SoldeCiUpdatePage {
  pageTitle = element(by.id('jhi-solde-ci-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  anneeInput = element(by.id('field_annee'));
  soldeMontantCiInput = element(by.id('field_soldeMontantCi'));
  soldeMontantCiRecInput = element(by.id('field_soldeMontantCiRec'));

  beneficiaireSelect = element(by.id('field_beneficiaire'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setAnneeInput(annee: string): Promise<void> {
    await this.anneeInput.sendKeys(annee);
  }

  async getAnneeInput(): Promise<string> {
    return await this.anneeInput.getAttribute('value');
  }

  async setSoldeMontantCiInput(soldeMontantCi: string): Promise<void> {
    await this.soldeMontantCiInput.sendKeys(soldeMontantCi);
  }

  async getSoldeMontantCiInput(): Promise<string> {
    return await this.soldeMontantCiInput.getAttribute('value');
  }

  async setSoldeMontantCiRecInput(soldeMontantCiRec: string): Promise<void> {
    await this.soldeMontantCiRecInput.sendKeys(soldeMontantCiRec);
  }

  async getSoldeMontantCiRecInput(): Promise<string> {
    return await this.soldeMontantCiRecInput.getAttribute('value');
  }

  async beneficiaireSelectLastOption(): Promise<void> {
    await this.beneficiaireSelect.all(by.tagName('option')).last().click();
  }

  async beneficiaireSelectOption(option: string): Promise<void> {
    await this.beneficiaireSelect.sendKeys(option);
  }

  getBeneficiaireSelect(): ElementFinder {
    return this.beneficiaireSelect;
  }

  async getBeneficiaireSelectedOption(): Promise<string> {
    return await this.beneficiaireSelect.element(by.css('option:checked')).getText();
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

export class SoldeCiDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-soldeCi-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-soldeCi'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
