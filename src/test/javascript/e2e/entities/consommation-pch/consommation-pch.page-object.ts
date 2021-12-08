import { element, by, ElementFinder } from 'protractor';

export class ConsommationPchComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-consommation-pch div table .btn-danger'));
  title = element.all(by.css('jhi-consommation-pch div h2#page-heading span')).first();
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

export class ConsommationPchUpdatePage {
  pageTitle = element(by.id('jhi-consommation-pch-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  dateInput = element(by.id('field_date'));
  montantCotisationsInput = element(by.id('field_montantCotisations'));
  nbHeuresInput = element(by.id('field_nbHeures'));

  beneficiaireSelect = element(by.id('field_beneficiaire'));
  strategiePchSelect = element(by.id('field_strategiePch'));

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

  async setMontantCotisationsInput(montantCotisations: string): Promise<void> {
    await this.montantCotisationsInput.sendKeys(montantCotisations);
  }

  async getMontantCotisationsInput(): Promise<string> {
    return await this.montantCotisationsInput.getAttribute('value');
  }

  async setNbHeuresInput(nbHeures: string): Promise<void> {
    await this.nbHeuresInput.sendKeys(nbHeures);
  }

  async getNbHeuresInput(): Promise<string> {
    return await this.nbHeuresInput.getAttribute('value');
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

  async strategiePchSelectLastOption(): Promise<void> {
    await this.strategiePchSelect.all(by.tagName('option')).last().click();
  }

  async strategiePchSelectOption(option: string): Promise<void> {
    await this.strategiePchSelect.sendKeys(option);
  }

  getStrategiePchSelect(): ElementFinder {
    return this.strategiePchSelect;
  }

  async getStrategiePchSelectedOption(): Promise<string> {
    return await this.strategiePchSelect.element(by.css('option:checked')).getText();
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

export class ConsommationPchDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-consommationPch-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-consommationPch'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
