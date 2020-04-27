import React, { Component, Fragment } from "react";
import { isEmpty, isNil, path } from "ramda";
import { inject, observer } from "mobx-react";
import Constraints from "@/constraints";
import validateJs from "validate.js";
import { Tooltip, InputWrapper } from "./style";

@inject("appStore")
@observer
class SheetInput extends Component {
  state = {
    value: this.props.value || "",
    errorMessage: "",
    hasError: false,
  };

  getConstraint = () => {
    const { constraint } = this.props;
    const constraintObj = path([constraint], Constraints);
    const fieldConstraint = { [constraint]: constraintObj };

    return fieldConstraint;
  };

  hasConstraint = () => !isNil(path([this.props.constraint], Constraints));

  onBlur = () => {
    const { value } = this.state;
    this.validate(value);
  };

  onChangeText = (newText) => {
    if (this.state.hasError) {
      this.validate(newText);
    }

    this.setState({
      value: newText,
    });
  };

  validate(text) {
    const shouldValidate = this.hasConstraint();

    if (shouldValidate) {
      const inputConstraint = this.props.constraint || "";
      const value = { [inputConstraint]: text };
      const constraint = this.getConstraint();
      const validation = validateJs(value, constraint);
      const constraintErrorMessage = validation
        ? validation[inputConstraint][0]
        : "";
      const errorMessage = !isEmpty(constraintErrorMessage)
        ? constraintErrorMessage
        : "";
      const hasError = !isEmpty(constraintErrorMessage);

      this.setState({
        errorMessage,
        hasError,
      });
    }
  }

  render() {
    const { value, hasError, errorMessage } = this.state;
    const { appStore, ...props } = this.props;

    return (
      <Fragment>
        <InputWrapper className={hasError ? "error" : ""}>
          <input
            {...props}
            value={value}
            onBlur={() => {
              this.onBlur();
              appStore.saveFieldEdited(this.props.id, value);
            }}
            onChange={({ target }) => this.onChangeText(target.value)}
            style={{ border: `1px solid ${hasError ? "red" : "transparent"}` }}
          />
          {hasError && <Tooltip>{errorMessage}</Tooltip>}
        </InputWrapper>
      </Fragment>
    );
  }
}

export default SheetInput;
