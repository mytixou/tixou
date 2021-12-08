import { element, by, ElementFinder } from 'protractor';

export class ConsommationCiComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-consommation-ci div table .btn-danger'));
  title = element.all(by.css('jhi-consommation-ci div h2#page-heading span')).first();
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

export class ConsommationCiUpdatePage {
  pageTitle = element(by.id('jhi-consommation-ci-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  dateInput = element(by.id('field_date'));
  montantCiInput = element(by.id('field_montantCi'));
  montantRecuperableInput = element(by.id('field_montantRecuperable'));

  beneficiaireSelect = element(by.id('field_beneficiaire'));
  strategieCiSelect = element(by.id('field_strategieCi'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async setMontantCiInput(montantCi: string): Promise<void> {
    await this.montantCiInput.sendKeys(montantCi);
  }

  async getMontantCiInput(): Promise<string> {
    return await this.montantCiInput.getAttribute('value');
  }

  async setMontantRecuperableInput(montantRecuperable: string): Promise<void> {
    await this.montantRecuperableInput.sendKeys(montantRecuperable);
  }

  async getMontantRecuperableInput(): Promise<string> {
    return await this.montantRecuperableInput.getAttribute('value');
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

  async strategieCiSelectLastOption(): Promise<void> {
    await this.strategieCiSelect.all(by.tagName('option')).last().click();
  }

  async strategieCiSelectOption(option: string): Promise<void> {
    await this.strategieCiSelect.sendKeys(option);
  }

  getStrategieCiSelect(): ElementFinder {
    return this.strategieCiSelect;
  }

  async getStrategieCiSelectedOption(): Promise<string> {
    return await this.strategieCiSelect.element(by.css('option:checked')).getText();
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

export class ConsommationCiDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-consommationCi-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-consommationCi'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
