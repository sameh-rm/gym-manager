import React from "react";
import "./styles.scss";
const Tippy = ({ content }) => {
  return (
    <div className="container">
      <small className="content"> {content} </small>
    </div>
  );
};

export default Tippy;
