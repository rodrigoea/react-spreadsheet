import { action, observable, computed } from "mobx";

class ModalStore {
  @observable
  visible = false;

  @action
  showModal() {
    this.visible = true;

    window.addEventListener("keyup", this.handleKeyUp, false);
  }

  @action
  hideModal() {
    this.visible = false;

    window.removeEventListener("keyup", this.handleKeyUp, false);
  }

  @computed
  get modalStatus() {
    return this.visible;
  }

  handleKeyUp = (e) => {
    const keys = {
      27: () => {
        e.preventDefault();
        this.hideModal();
      },
    };

    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  };
}

export default new ModalStore();
