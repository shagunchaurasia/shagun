import React, { Component } from "react";
import "./square.style.scss";
const Square = (props) => {
  console.log(props);
  return (
    <button
      className="square"
      onClick={() => props.onClick(props.index)}
      disabled={props.value ? true : false}
    >
      {props.value}
    </button>
  );
};

export default Square;
