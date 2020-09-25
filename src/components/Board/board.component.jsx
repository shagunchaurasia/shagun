import React, { Component } from "react";
import Square from "../Square/square.component";

const Board = (props) => {
  const renderStyledSquare = (index) => {
    if (index === 0 || index % props.numberPassed === 0) {
      return (
        //if i is 0 and modulus of number provided is 0
        <div style={{ display: "block", clear: "both", float: "left" }}>
          <Square
            index={index}
            onClick={() => props.onClick(index)}
            value={props.squares[index]}
          ></Square>
        </div>
      );
    } else {
      return (
        <div style={{ display: "inline-block", float: "left" }}>
          <Square
            index={index}
            onClick={() => props.onClick(index)}
            value={props.squares[index]}
          ></Square>
        </div>
      );
    }
  };
  return (
    <div>
      {props.squares.map((square, index) => {
        return renderStyledSquare(index);
      })}
    </div>
  );
};

export default Board;
