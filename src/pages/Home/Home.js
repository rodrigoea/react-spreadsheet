import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import {
  EmptyListWrapper,
  EmptyTitle,
  EmptySubtitle,
  ListWrapper,
} from "./style";
import { ModalHeader, ModalBody, ModalFooter } from "@/components/Modal/style";

// states
import modalState from "@/components/Modal/state";
import FormState from "@/stores/FormState";

@inject("appStore")
@observer
class Home extends Component {
  onInputChange = (value) => {
    FormState.setNewSpreadsheetTitle(value);
  };

  createNewSpreadsheet = async () => {
    const { newSpreadsheetTitle } = FormState;
    if (newSpreadsheetTitle === "") {
      alert("Please, enter a name for your spreadsheet!");
      return false;
    }

    const createdId = await this.props.appStore.createNewSpreadsheet(
      newSpreadsheetTitle
    );
    this.props.history.push(`/spreadsheet/${createdId}`);
  };

  renderContent = () => {
    const spreadsheetsQuantity = this.props.appStore.spreadsheets.length;

    if (spreadsheetsQuantity > 0) {
      return this.renderList();
    } else {
      return this.renderEmptyList();
    }
  };

  renderList = () => {
    const { allSpreadsheets } = this.props.appStore;

    return (
      <ListWrapper>
        <Button
          onClick={() => this.showModal()}
          theme={"primary"}
          style={{ marginBottom: 30 }}
        >
          Create a new spreadsheet
        </Button>

        <br />

        <h2 className="listTitle">My Spreadsheets</h2>

        {allSpreadsheets.reverse().map((spreadsheet) => {
          return (
            <React.Fragment key={spreadsheet.id}>
              <Link className="listLink" to={`/spreadsheet/${spreadsheet.id}`}>
                {spreadsheet.name}
              </Link>
            </React.Fragment>
          );
        })}
      </ListWrapper>
    );
  };

  renderCreateModal = () => (
    <Modal>
      <ModalHeader>Create a Spreadsheet</ModalHeader>
      <ModalBody>
        <Input
          ref={(item) => (this.input = item)}
          type="text"
          value={FormState.newSpreadsheetTitle}
          placeholder="Spreadsheet title"
          onChange={({ target }) => {
            this.onInputChange(target.value);
          }}
          style={{ marginBottom: 10 }}
        />
      </ModalBody>

      <ModalFooter>
        <Button
          onClick={() => this.hideModal()}
          style={{ marginRight: 10 }}
          theme={"danger"}
        >
          Cancel
        </Button>
        <Button onClick={() => this.createNewSpreadsheet()} theme={"success"}>
          Create now!
        </Button>
      </ModalFooter>
    </Modal>
  );

  renderEmptyList = () => (
    <EmptyListWrapper>
      <EmptyTitle>You have not created any spreadsheets!</EmptyTitle>
      <EmptySubtitle>How about start creating one now?</EmptySubtitle>
      <Button
        onClick={() => this.showModal()}
        theme={"primary"}
        className="createBtn"
      >
        Create a new Spreadsheet
      </Button>
    </EmptyListWrapper>
  );

  hideModal = () => {
    modalState.hideModal();
  };

  showModal = () => {
    modalState.showModal();
  };

  render() {
    return (
      <div>
        {this.renderContent()}
        {this.renderCreateModal()}
      </div>
    );
  }
}

export default Home;
