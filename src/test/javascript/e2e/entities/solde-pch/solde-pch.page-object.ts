import { element, by, ElementFinder } from 'protractor';

export class SoldePchComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-solde-pch div table .btn-danger'));
  title = element.all(by.css('jhi-solde-pch div h2#page-heading span')).first();
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

export class SoldePchUpdatePage {
  pageTitle = element(by.id('jhi-solde-pch-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  anneeInput = element(by.id('field_annee'));
  moisInput = element(by.id('field_mois'));
  soldeMontantPchInput = element(by.id('field_soldeMontantPch'));
  soldeHeurePchInput = element(by.id('field_soldeHeurePch'));

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

  async setSoldeMontantPchInput(soldeMontantPch: string): Promise<void> {
    await this.soldeMontantPchInput.sendKeys(soldeMontantPch);
  }

  async getSoldeMontantPchInput(): Promise<string> {
    return await this.soldeMontantPchInput.getAttribute('value');
  }

  async setSoldeHeurePchInput(soldeHeurePch: string): Promise<void> {
    await this.soldeHeurePchInput.sendKeys(soldeHeurePch);
  }

  async getSoldeHeurePchInput(): Promise<string> {
    return await this.soldeHeurePchInput.getAttribute('value');
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

export class SoldePchDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-soldePch-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-soldePch'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
