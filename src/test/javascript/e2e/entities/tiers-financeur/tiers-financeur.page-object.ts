import { element, by, ElementFinder } from 'protractor';

export class TiersFinanceurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tiers-financeur div table .btn-danger'));
  title = element.all(by.css('jhi-tiers-financeur div h2#page-heading span')).first();
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

export class TiersFinanceurUpdatePage {
  pageTitle = element(by.id('jhi-tiers-financeur-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nomInput = element(by.id('field_nom'));
  localisationInput = element(by.id('field_localisation'));
  isActifInput = element(by.id('field_isActif'));
  dateInscriptionInput = element(by.id('field_dateInscription'));
  anneLancementInput = element(by.id('field_anneLancement'));
  moisLancementInput = element(by.id('field_moisLancement'));
  dateResiliationInput = element(by.id('field_dateResiliation'));
  derniereAnneeInput = element(by.id('field_derniereAnnee'));
  dernierMoisInput = element(by.id('field_dernierMois'));

  strategieSelect = element(by.id('field_strategie'));
  strategieSelect = element(by.id('field_strategie'));
  strategieSelect = element(by.id('field_strategie'));
  strategieSelect = element(by.id('field_strategie'));

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

  async setLocalisationInput(localisation: string): Promise<void> {
    await this.localisationInput.sendKeys(localisation);
  }

  async getLocalisationInput(): Promise<string> {
    return await this.localisationInput.getAttribute('value');
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

  async setAnneLancementInput(anneLancement: string): Promise<void> {
    await this.anneLancementInput.sendKeys(anneLancement);
  }

  async getAnneLancementInput(): Promise<string> {
    return await this.anneLancementInput.getAttribute('value');
  }

  async setMoisLancementInput(moisLancement: string): Promise<void> {
    await this.moisLancementInput.sendKeys(moisLancement);
  }

  async getMoisLancementInput(): Promise<string> {
    return await this.moisLancementInput.getAttribute('value');
  }

  async setDateResiliationInput(dateResiliation: string): Promise<void> {
    await this.dateResiliationInput.sendKeys(dateResiliation);
  }

  async getDateResiliationInput(): Promise<string> {
    return await this.dateResiliationInput.getAttribute('value');
  }

  async setDerniereAnneeInput(derniereAnnee: string): Promise<void> {
    await this.derniereAnneeInput.sendKeys(derniereAnnee);
  }

  async getDerniereAnneeInput(): Promise<string> {
    return await this.derniereAnneeInput.getAttribute('value');
  }

  async setDernierMoisInput(dernierMois: string): Promise<void> {
    await this.dernierMoisInput.sendKeys(dernierMois);
  }

  async getDernierMoisInput(): Promise<string> {
    return await this.dernierMoisInput.getAttribute('value');
  }

  async strategieSelectLastOption(): Promise<void> {
    await this.strategieSelect.all(by.tagName('option')).last().click();
  }

  async strategieSelectOption(option: string): Promise<void> {
    await this.strategieSelect.sendKeys(option);
  }

  getStrategieSelect(): ElementFinder {
    return this.strategieSelect;
  }

  async getStrategieSelectedOption(): Promise<string> {
    return await this.strategieSelect.element(by.css('option:checked')).getText();
  }

  async strategieSelectLastOption(): Promise<void> {
    await this.strategieSelect.all(by.tagName('option')).last().click();
  }

  async strategieSelectOption(option: string): Promise<void> {
    await this.strategieSelect.sendKeys(option);
  }

  getStrategieSelect(): ElementFinder {
    return this.strategieSelect;
  }

  async getStrategieSelectedOption(): Promise<string> {
    return await this.strategieSelect.element(by.css('option:checked')).getText();
  }

  async strategieSelectLastOption(): Promise<void> {
    await this.strategieSelect.all(by.tagName('option')).last().click();
  }

  async strategieSelectOption(option: string): Promise<void> {
    await this.strategieSelect.sendKeys(option);
  }

  getStrategieSelect(): ElementFinder {
    return this.strategieSelect;
  }

  async getStrategieSelectedOption(): Promise<string> {
    return await this.strategieSelect.element(by.css('option:checked')).getText();
  }

  async strategieSelectLastOption(): Promise<void> {
    await this.strategieSelect.all(by.tagName('option')).last().click();
  }

  async strategieSelectOption(option: string): Promise<void> {
    await this.strategieSelect.sendKeys(option);
  }

  getStrategieSelect(): ElementFinder {
    return this.strategieSelect;
  }

  async getStrategieSelectedOption(): Promise<string> {
    return await this.strategieSelect.element(by.css('option:checked')).getText();
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

export class TiersFinanceurDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tiersFinanceur-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tiersFinanceur'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
