import { action, observable, computed } from "mobx";
import ColumnMock from "@/utils/ColumnMock";

export default class AppStore {
  @observable
  currentSpreadsheet = "";

  @observable
  spreadsheets = JSON.parse(localStorage.getItem("reactSpreadsheets")) || [];

  @action
  addRow() {
    const spreadsheet = this.currentSpreadsheet;
    const rows = 10;

    for (let row = 0; row < rows; row++) {
      spreadsheet.data.forEach((item) => {
        const lastCurrentRow = item[item.length - 1];
        const blankRow = { ...lastCurrentRow };
        const rowNumber =
          +lastCurrentRow["position"].substr(
            1,
            lastCurrentRow["position"].length - 1
          ) + 1;
        const rowPosition = `${lastCurrentRow["position"][0]}${rowNumber}`;
        blankRow["value"] = "";
        blankRow["position"] = rowPosition;
        item.push(blankRow);
      });
    }

    this.saveSpreadsheet();
  }

  @action
  addCol(spreadsheetId, colTitle, colType) {
    const spreadsheet = this.currentSpreadsheet;
    const { data } = spreadsheet;
    const lastColumn = data[data.length - 1];

    if (this.isLastCol(lastColumn)) {
      alert("You can not create more columns!");
      return false;
    }

    let newColumn;

    if (data[0].length === 0) {
      // first column
      newColumn = [...ColumnMock];
      newColumn[0]["position"] = "A0";
      newColumn[0]["value"] = colTitle || "";
      newColumn[0]["type"] = colType || "text";

      spreadsheet.data[0] = [...newColumn];
    } else {
      const rowsQuantity = new Array(lastColumn.length).fill("");
      newColumn = [];

      rowsQuantity.forEach((item, index) => {
        const currentPosition = lastColumn[index]["position"];
        const currentLetter = currentPosition[0];
        const currentLine = currentPosition.substr(
          1,
          currentPosition.length - 1
        );
        const newPosition = `${this.getNextLetter(
          currentLetter
        )}${currentLine}`;

        const obj = { ...ColumnMock[0] };

        obj["position"] = newPosition;
        obj["value"] = index === 0 ? colTitle : "";
        obj["type"] = colType || "text";

        newColumn.push(obj);
      });

      spreadsheet.data.push(newColumn);
    }

    this.saveSpreadsheet();
  }

  getNextLetter = (letter) => {
    const nextLetter = letter.charCodeAt(0) + 1;
    return String.fromCharCode(nextLetter);
  };

  isLastCol = (column) => {
    if (column.length === 0) {
      return false;
    }

    const letter = column[0]["position"][0];
    return letter.toLowerCase() === "z";
  };

  @action
  initAutoSave() {
    setInterval(() => {
      this.saveSpreadsheet();
    }, 10000); // auto save every 1 minute
  }

  @action
  saveSpreadsheet() {
    this.saveOnLocalStorage();
  }

  @action
  setCurrentSpreadsheet(spreadsheetId) {
    const spreadsheet = this.allSpreadsheets.find(
      (item) => item.id === spreadsheetId
    );
    this.currentSpreadsheet = spreadsheet;
  }

  saveOnLocalStorage = () => {
    localStorage.setItem(
      "reactSpreadsheets",
      JSON.stringify(this.allSpreadsheets)
    );
  };

  @action
  createNewSpreadsheet(title) {
    const newSpreadsheet = {};
    const id = this.generateId();

    newSpreadsheet.id = id;
    newSpreadsheet.name = title;
    newSpreadsheet.data = [[]];

    this.spreadsheets.push(newSpreadsheet);
    this.saveOnLocalStorage();
    this.setCurrentSpreadsheet(id);

    return id;
  }

  @action
  saveFieldEdited(fieldPosition, value) {
    const { data } = this.currentSpreadsheet;
    const fieldRow = data.map((col) =>
      col.find((row) => row.position === fieldPosition)
    );
    const field = fieldRow.filter((item) => item !== undefined);

    if (field[0]["value"] !== value) {
      field[0]["value"] = value;
      this.saveSpreadsheet();
    }
  }

  generateId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  @computed
  get allSpreadsheets() {
    return this.spreadsheets;
  }
}
