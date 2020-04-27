import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MenuWrapper } from "./style";

class Menu extends Component {
  render() {
    return (
      <MenuWrapper>
        <Link to="/">
          <h1>React Spreadsheet</h1>
        </Link>
      </MenuWrapper>
    );
  }
}

export default Menu;
