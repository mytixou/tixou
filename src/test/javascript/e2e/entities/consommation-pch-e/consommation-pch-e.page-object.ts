import { element, by, ElementFinder } from 'protractor';

export class ConsommationPchEComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-consommation-pch-e div table .btn-danger'));
  title = element.all(by.css('jhi-consommation-pch-e div h2#page-heading span')).first();
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

export class ConsommationPchEUpdatePage {
  pageTitle = element(by.id('jhi-consommation-pch-e-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  dateInput = element(by.id('field_date'));
  montantCotisationsInput = element(by.id('field_montantCotisations'));
  nbHeuresInput = element(by.id('field_nbHeures'));

  beneficiaireSelect = element(by.id('field_beneficiaire'));
  strategiePchESelect = element(by.id('field_strategiePchE'));

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

  async strategiePchESelectLastOption(): Promise<void> {
    await this.strategiePchESelect.all(by.tagName('option')).last().click();
  }

  async strategiePchESelectOption(option: string): Promise<void> {
    await this.strategiePchESelect.sendKeys(option);
  }

  getStrategiePchESelect(): ElementFinder {
    return this.strategiePchESelect;
  }

  async getStrategiePchESelectedOption(): Promise<string> {
    return await this.strategiePchESelect.element(by.css('option:checked')).getText();
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

export class ConsommationPchEDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-consommationPchE-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-consommationPchE'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
