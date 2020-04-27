import React, { Component } from "react";
import { Modal, ModalWrapper, CloseModal } from "./style";
import modalState from "./state";
import { observer } from "mobx-react";

@observer
class Button extends Component {
  showModal = () => {
    modalState.showModal();
  };

  hideModal = () => {
    modalState.hideModal();
  };

  render() {
    return (
      <ModalWrapper className={modalState.modalStatus && "visible"}>
        <Modal>
          <CloseModal onClick={() => this.hideModal()}>x</CloseModal>
          {this.props.children}
        </Modal>
      </ModalWrapper>
    );
  }
}

export default Button;
