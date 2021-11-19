import { element, by, ElementFinder } from 'protractor';

export class ChoixReponseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-choix-reponse div table .btn-danger'));
  title = element.all(by.css('jhi-choix-reponse div h2#page-heading span')).first();
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

export class ChoixReponseUpdatePage {
  pageTitle = element(by.id('jhi-choix-reponse-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  dateChoixInput = element(by.id('field_dateChoix'));

  dossierSelect = element(by.id('field_dossier'));
  reponseSelect = element(by.id('field_reponse'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setDateChoixInput(dateChoix: string): Promise<void> {
    await this.dateChoixInput.sendKeys(dateChoix);
  }

  async getDateChoixInput(): Promise<string> {
    return await this.dateChoixInput.getAttribute('value');
  }

  async dossierSelectLastOption(): Promise<void> {
    await this.dossierSelect.all(by.tagName('option')).last().click();
  }

  async dossierSelectOption(option: string): Promise<void> {
    await this.dossierSelect.sendKeys(option);
  }

  getDossierSelect(): ElementFinder {
    return this.dossierSelect;
  }

  async getDossierSelectedOption(): Promise<string> {
    return await this.dossierSelect.element(by.css('option:checked')).getText();
  }

  async reponseSelectLastOption(): Promise<void> {
    await this.reponseSelect.all(by.tagName('option')).last().click();
  }

  async reponseSelectOption(option: string): Promise<void> {
    await this.reponseSelect.sendKeys(option);
  }

  getReponseSelect(): ElementFinder {
    return this.reponseSelect;
  }

  async getReponseSelectedOption(): Promise<string> {
    return await this.reponseSelect.element(by.css('option:checked')).getText();
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

export class ChoixReponseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-choixReponse-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-choixReponse'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
