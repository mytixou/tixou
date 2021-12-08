import { element, by, ElementFinder } from 'protractor';

export class AideComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-aide div table .btn-danger'));
  title = element.all(by.css('jhi-aide div h2#page-heading span')).first();
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

export class AideUpdatePage {
  pageTitle = element(by.id('jhi-aide-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nomSelect = element(by.id('field_nom'));
  isActifInput = element(by.id('field_isActif'));
  dateLancementInput = element(by.id('field_dateLancement'));
  anneLancementInput = element(by.id('field_anneLancement'));
  moisLancementInput = element(by.id('field_moisLancement'));
  dateArretInput = element(by.id('field_dateArret'));
  derniereAnneeInput = element(by.id('field_derniereAnnee'));
  dernierMoisInput = element(by.id('field_dernierMois'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setNomSelect(nom: string): Promise<void> {
    await this.nomSelect.sendKeys(nom);
  }

  async getNomSelect(): Promise<string> {
    return await this.nomSelect.element(by.css('option:checked')).getText();
  }

  async nomSelectLastOption(): Promise<void> {
    await this.nomSelect.all(by.tagName('option')).last().click();
  }

  getIsActifInput(): ElementFinder {
    return this.isActifInput;
  }

  async setDateLancementInput(dateLancement: string): Promise<void> {
    await this.dateLancementInput.sendKeys(dateLancement);
  }

  async getDateLancementInput(): Promise<string> {
    return await this.dateLancementInput.getAttribute('value');
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

  async setDateArretInput(dateArret: string): Promise<void> {
    await this.dateArretInput.sendKeys(dateArret);
  }

  async getDateArretInput(): Promise<string> {
    return await this.dateArretInput.getAttribute('value');
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

export class AideDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-aide-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-aide'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
