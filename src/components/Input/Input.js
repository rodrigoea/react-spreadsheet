import React, { Component, Fragment } from "react";
import { FormInput } from "./style";

class Input extends Component {
  render() {
    return (
      <Fragment>
        <FormInput value={this.props.value} {...this.props} />
      </Fragment>
    );
  }
}

export default Input;
