import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ErrorWrapper } from "./style";

class NotFound extends Component {
  render() {
    return (
      <ErrorWrapper>
        <h1>Whoops!</h1>
        <h2>Error 404!</h2>

        <Link className="listLink" to={`/`}>
          Navigate to home
        </Link>
      </ErrorWrapper>
    );
  }
}

export default NotFound;
