import { action, observable } from "mobx";

class FormState {
  @observable newColumnTitle = "";
  @observable newColumnType = "";
  @observable newSpreadsheetTitle = "";

  @action
  setNewSpreadsheetTitle(title) {
    this.newSpreadsheetTitle = title;
  }

  @action
  setNewColumnTitle(title) {
    this.newColumnTitle = title;
  }

  @action
  setNewColumnType(type) {
    this.newColumnType = type;
  }

  @action
  clearAddColumn() {
    this.newColumnTitle = "";
    this.newColumnType = "";
  }
}

export default new FormState();
