import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = (props) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: props.width,
        height: props.width,
        margin: props.margin,
        display: "block",
      }}
    >
      <span className="sr-only">Loading....</span>
    </Spinner>
  );
};

Loader.defaultProps = {
  width: "100px",
  height: "100px",
  margin: "auto",
};

export default Loader;
