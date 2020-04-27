import React, { Component, Fragment } from "react";
import SheetInput from "@/components/SheetInput";
import { observer, inject } from "mobx-react";
import { Table, TableWrapper } from "./style";

@inject("appStore")
@observer
class SheetTable extends Component {
  state = {
    alphabetArray: [],
  };

  componentWillMount() {
    this.setState({
      alphabetArray: this.generateAlphabetArray(),
    });
  }

  getCols = () => new Array(this.props.cols).fill("");
  getRows = () => new Array(this.props.rows + 1).fill("");

  generateAlphabetArray = () => {
    let arr = [];
    let letter = "a".charCodeAt(0),
      z = "z".charCodeAt(0);

    for (; letter <= z; letter++) {
      arr.push(String.fromCharCode(letter));
    }

    return arr;
  };

  getColPosition = (pos) => {
    return this.state.alphabetArray[pos].toUpperCase();
  };

  renderTableHeader = () => {
    const cols = this.getCols();

    return (
      <tr>
        <td></td>
        {cols.map((col, pos) => {
          const colTitle = this.getColPosition(pos);
          return (
            <td key={pos}>
              <span>{colTitle}</span>
            </td>
          );
        })}
      </tr>
    );
  };

  renderColsTitle = () => {
    const { data } = this.props;
    const cols = this.getCols();

    return (
      <tr>
        <td></td>
        {cols.map((col, pos) => {
          const colId = `${this.getColPosition(pos)}0`;
          const colTitle = data[pos][0].value;
          return (
            <td key={pos}>
              <SheetInput id={colId} value={colTitle} />
            </td>
          );
        })}
      </tr>
    );
  };

  renderCols = () => {
    const { data } = this.props;
    const cols = this.getCols();
    const rows = this.getRows();

    return (
      <Fragment>
        {this.renderColsTitle()}

        {rows.map((row, rowPosition) => {
          if (rowPosition === 0) {
            return false;
          }

          return (
            <tr key={rowPosition}>
              <td>{rowPosition > 0 && <span>{rowPosition}</span>}</td>

              {cols.map((col, colPosition) => {
                const { value, type, position } = data[colPosition][
                  rowPosition
                ];
                const colId = position;
                const fieldValue = value;
                const fieldType = type;

                return (
                  <td key={colPosition}>
                    <SheetInput
                      type="text"
                      constraint={fieldType}
                      id={colId}
                      value={fieldValue}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </Fragment>
    );
  };

  renderFields = () => {
    return (
      <TableWrapper>
        <Table>
          <tbody>
            {this.renderTableHeader()}
            {this.renderCols()}
          </tbody>
        </Table>
      </TableWrapper>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.props.appStore.currentSpreadsheet.data[0].length > 0 &&
          this.renderFields()}
      </React.Fragment>
    );
  }
}

export default SheetTable;
