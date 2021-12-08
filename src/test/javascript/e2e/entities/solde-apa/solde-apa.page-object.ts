import { element, by, ElementFinder } from 'protractor';

export class SoldeApaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-solde-apa div table .btn-danger'));
  title = element.all(by.css('jhi-solde-apa div h2#page-heading span')).first();
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

export class SoldeApaUpdatePage {
  pageTitle = element(by.id('jhi-solde-apa-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  anneeInput = element(by.id('field_annee'));
  moisInput = element(by.id('field_mois'));
  soldeMontantApaInput = element(by.id('field_soldeMontantApa'));
  soldeHeureApaInput = element(by.id('field_soldeHeureApa'));

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

  async setMoisInput(mois: string): Promise<void> {
    await this.moisInput.sendKeys(mois);
  }

  async getMoisInput(): Promise<string> {
    return await this.moisInput.getAttribute('value');
  }

  async setSoldeMontantApaInput(soldeMontantApa: string): Promise<void> {
    await this.soldeMontantApaInput.sendKeys(soldeMontantApa);
  }

  async getSoldeMontantApaInput(): Promise<string> {
    return await this.soldeMontantApaInput.getAttribute('value');
  }

  async setSoldeHeureApaInput(soldeHeureApa: string): Promise<void> {
    await this.soldeHeureApaInput.sendKeys(soldeHeureApa);
  }

  async getSoldeHeureApaInput(): Promise<string> {
    return await this.soldeHeureApaInput.getAttribute('value');
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

export class SoldeApaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-soldeApa-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-soldeApa'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
