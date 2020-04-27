import React, { Component } from "react";
import { ButtonComponent } from "./style";

class Button extends Component {
  render() {
    return (
      <ButtonComponent onClick={this.props.onClick} {...this.props}>
        {this.props.children}
      </ButtonComponent>
    );
  }
}

export default Button;
