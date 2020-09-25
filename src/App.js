import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./components/Game/game.component";

function App() {
  return (
    <div className="App">
      <Game numberPassed="3"></Game>
    </div>
  );
}

export default App;
