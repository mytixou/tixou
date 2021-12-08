import { element, by, ElementFinder } from 'protractor';

export class StrategieApaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-strategie-apa div table .btn-danger'));
  title = element.all(by.css('jhi-strategie-apa div h2#page-heading span')).first();
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

export class StrategieApaUpdatePage {
  pageTitle = element(by.id('jhi-strategie-apa-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  isActifInput = element(by.id('field_isActif'));
  anneInput = element(by.id('field_anne'));
  montantPlafondInput = element(by.id('field_montantPlafond'));
  nbPlafondheureInput = element(by.id('field_nbPlafondheure'));
  tauxInput = element(by.id('field_taux'));

  aideSelect = element(by.id('field_aide'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  getIsActifInput(): ElementFinder {
    return this.isActifInput;
  }

  async setAnneInput(anne: string): Promise<void> {
    await this.anneInput.sendKeys(anne);
  }

  async getAnneInput(): Promise<string> {
    return await this.anneInput.getAttribute('value');
  }

  async setMontantPlafondInput(montantPlafond: string): Promise<void> {
    await this.montantPlafondInput.sendKeys(montantPlafond);
  }

  async getMontantPlafondInput(): Promise<string> {
    return await this.montantPlafondInput.getAttribute('value');
  }

  async setNbPlafondheureInput(nbPlafondheure: string): Promise<void> {
    await this.nbPlafondheureInput.sendKeys(nbPlafondheure);
  }

  async getNbPlafondheureInput(): Promise<string> {
    return await this.nbPlafondheureInput.getAttribute('value');
  }

  async setTauxInput(taux: string): Promise<void> {
    await this.tauxInput.sendKeys(taux);
  }

  async getTauxInput(): Promise<string> {
    return await this.tauxInput.getAttribute('value');
  }

  async aideSelectLastOption(): Promise<void> {
    await this.aideSelect.all(by.tagName('option')).last().click();
  }

  async aideSelectOption(option: string): Promise<void> {
    await this.aideSelect.sendKeys(option);
  }

  getAideSelect(): ElementFinder {
    return this.aideSelect;
  }

  async getAideSelectedOption(): Promise<string> {
    return await this.aideSelect.element(by.css('option:checked')).getText();
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

export class StrategieApaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-strategieApa-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-strategieApa'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
