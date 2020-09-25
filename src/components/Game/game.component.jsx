import React, { Component } from "react";
import Board from "../Board/board.component";
import Overlay from "../Overlay/Overlay.component";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(props.numberPassed * props.numberPassed).fill(null),
        },
      ],
      historyStep: 0,
      willXbeNext: true,
    };
  }

  handleStateChange(i) {
    console.log("Clicked from child" + i);
    const history = this.state.history.slice(0, this.state.historyStep + 1);
    const currentStep = history[history.length - 1];
    const squares = currentStep.squares.slice();

    //if winner decided return // or square is already rendered with a value
    if (winnerLogicDynamic(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.willXbeNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      historyStep: history.length,
      willXbeNext: !this.state.willXbeNext,
    });

    console.log(squares);
  }

  jumpTo(stepNumber) {
    this.setState({
      historyStep: stepNumber,
      willXbeNext: stepNumber % 2 === 0,
    });
  }

  renderWinnerScreen() {
    console.log("Inside render winner screen");
    return <Overlay></Overlay>;
  }

  render() {
    let status;
    const history = this.state.history;
    const currentStep = history[this.state.historyStep];
    const winner = winnerLogicDynamic(currentStep.squares);

    const moves = history.map((step, move) => {
      const message = move ? "Go to Move " + move : "Go to Game Start";

      return (
        <div key={move}>
          <button onClick={() => this.jumpTo(move)}>{message}</button>
        </div>
      );
    });

    if (winner) {
      this.renderWinnerScreen();
      status = "Winner " + winner;
    } else {
      status = "Next player plays: " + (this.state.willXbeNext ? "X" : "O");
    }

    return (
      <div>
        {status}
        <Board
          squares={currentStep.squares}
          numberPassed={this.props.numberPassed}
          onClick={(i) => this.handleStateChange(i)}
        ></Board>

        {moves}
      </div>
    );
  }
}

function winnerLogicDynamic(squares) {
  console.log("squares for winning logic");
  console.log(squares);
  //Row combinations
  // [0,1,2], n=3
  // [3,4,5],
  // [6,7,8]
  // [3*0, 3*0+1, 3*0+2]
  // [3*0+3]

  var rowCombinations = [];
  function getRowCombinations() {
    console.log(squares.length);
    var squareRoot = Math.sqrt(squares.length);
    console.log(squareRoot);

    for (let i = 0; i < squareRoot; i++) {
      let myArray = [];
      for (let j = 0; j < squareRoot; j++) {
        myArray.push(i * squareRoot + j);
      }
      rowCombinations.push(myArray);
    }
  }
  getRowCombinations();
  console.log("Row combinations for the given matrix");
  console.log(rowCombinations);

  var columnCombinations = [];
  function getColumnCombinations() {
    var squareRoot = Math.sqrt(squares.length);

    for (let i = 0; i < squareRoot; i++) {
      let myArray = [];
      for (let j = 0; j < squareRoot; j++) {
        myArray.push(i + squareRoot * j);
      }
      columnCombinations.push(myArray);
    }
  }
  getColumnCombinations();
  console.log(columnCombinations);
  var diagonalCombinations = [];
  function getDiagonalCombinations() {
    var squareRoot = Math.sqrt(squares.length);

    for (let i = 0; i < squareRoot; i++) {
      let myArray = [];

      for (let j = 0; j < squareRoot; j++) {
        myArray.push(squareRoot * j + j);
      }

      diagonalCombinations.push(myArray);
      break;
    }
  }
  getDiagonalCombinations();
  let invertedDiagonalCombinations = [];
  function getInvertedDiagonals() {
    var squareRoot = Math.sqrt(squares.length);

    for (let i = 0; i < squareRoot; i++) {
      let myArray = [];

      for (let j = 0; j < squareRoot; j++) {
        myArray.push(squareRoot - 1 + j);
      }

      invertedDiagonalCombinations.push(myArray);
      break;
    }
  }
  getInvertedDiagonals();
  //Put all combinations into an array

  let finalCombinations = columnCombinations
    .concat(diagonalCombinations)
    .concat(rowCombinations)
    .concat(invertedDiagonalCombinations);

  console.log("finalCombinations");
  console.log(finalCombinations);

  for (let k = 0; k < finalCombinations.length; k++) {
    const [...a] = finalCombinations[k];

    console.log(a);
    const allEqual = (a) => a.every((v) => squares[v] === squares[a[0]]);

    console.log("allEqual(a)");
    console.log(allEqual(a));

    if (allEqual(a) === true) {
      return squares[a[0]];
    }
  }
  return null;
}
export default Game;
