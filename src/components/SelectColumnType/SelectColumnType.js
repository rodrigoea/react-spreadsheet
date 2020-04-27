import React, { Component } from "react";
import { CustomSelect, SelectWrapper } from "./style";
import { observer } from "mobx-react";
import FormState from "@/stores/FormState";

@observer
class SelectColumnType extends Component {
  onChange = (value) => {
    FormState.setNewColumnType(value);
  };

  render() {
    return (
      <SelectWrapper>
        <CustomSelect
          onChange={({ target }) => this.onChange(target.value)}
          value={FormState.newColumnType}
        >
          <option value="" disabled>
            Select the field type for this column
          </option>
          <option value="date">Date</option>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="select">select --not implemented :(</option>
        </CustomSelect>
      </SelectWrapper>
    );
  }
}

export default SelectColumnType;
