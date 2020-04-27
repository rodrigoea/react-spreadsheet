import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { SheetMenu, SpreadsheetWrapper } from "./style";
import SheetTable from "./SheetTable";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { ModalHeader, ModalBody, ModalFooter } from "@/components/Modal/style";
import Input from "@/components/Input";
import SelectColumnType from "@/components/SelectColumnType";

// states
import modalState from "@/components/Modal/state";
import FormState from "@/stores/FormState";

@inject("appStore")
@observer
class Spreadsheet extends Component {
  componentWillMount() {
    this.props.appStore.setCurrentSpreadsheet(this.props.match.params.id);
    this.props.appStore.initAutoSave();

    if (!this.getSpreadsheet()) {
      this.props.history.push(`/`);
    }
  }

  getSpreadsheet = () => {
    return this.props.appStore.currentSpreadsheet;
  };

  getSpreadsheetCols = () => {
    const cols = this.getSpreadsheet().data.length;
    return +cols;
  };

  getSpreadsheetRows = () => {
    const rows = this.getSpreadsheet().data[0].length - 1;
    return +rows === -1 ? 0 : +rows;
  };

  getSpreadsheetData = () => {
    return this.getSpreadsheet().data;
  };

  addRow = () => {
    const { id } = this.getSpreadsheet();
    this.props.appStore.addRow(id);
  };

  addCol = () => {
    const { id } = this.getSpreadsheet();
    const { newColumnTitle, newColumnType } = FormState;

    this.props.appStore.addCol(id, newColumnTitle, newColumnType);

    FormState.clearAddColumn();
    this.hideModal();
  };

  renderModal = () => {
    return <Modal>{this.renderModalContent()}</Modal>;
  };

  renderModalContent = () => {
    return (
      <div>
        <ModalHeader>Add a new column</ModalHeader>

        <ModalBody>
          <Input
            type="text"
            value={FormState.newColumnTitle}
            placeholder="Column title"
            onChange={({ target }) => {
              this.onInputChange(target.value);
            }}
            onKeyPress={(e) => this.handleKeyPress(e)}
            style={{ marginBottom: 10 }}
          />
          <SelectColumnType />
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => this.hideModal()}
            style={{ marginRight: 10 }}
            theme={"danger"}
          >
            Cancel
          </Button>
          <Button onClick={() => this.addCol()} theme={"success"}>
            Add column
          </Button>
        </ModalFooter>
      </div>
    );
  };

  hideModal = () => {
    modalState.hideModal();
  };

  showModal = () => {
    modalState.showModal();
  };

  onInputChange = (value) => {
    FormState.setNewColumnTitle(value);
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.addCol();
    }
  };

  spreadsheetIsEmpty = () => {
    return this.getSpreadsheetData()[0].length === 0;
  };

  save = () => {
    this.props.appStore.saveSpreadsheet();
  };

  render() {
    return (
      <SpreadsheetWrapper>
        {this.getSpreadsheet() && (
          <React.Fragment>
            <SheetMenu>
              {this.getSpreadsheet()["name"]}
              <br />
              <br />
              {!this.spreadsheetIsEmpty() && (
                <Button style={{ marginRight: "10px" }} onClick={this.addRow}>
                  Add 10 rows
                </Button>
              )}
              <Button
                onClick={() => this.showModal()}
                style={{ marginRight: "10px" }}
              >
                Add column
              </Button>
              <Button
                onClick={() => {
                  this.save();
                }}
                theme={"success"}
                style={{ marginRight: "10px" }}
              >
                Save
              </Button>
            </SheetMenu>

            <SheetTable
              cols={this.getSpreadsheetCols()}
              rows={this.getSpreadsheetRows()}
              data={this.getSpreadsheetData()}
            />

            {this.renderModal()}
          </React.Fragment>
        )}
      </SpreadsheetWrapper>
    );
  }
}

export default Spreadsheet;
