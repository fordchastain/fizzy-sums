import React from "react"
import logo from '../logo.svg';
import './SumPuzzle.css';
import GridSquare from "./GridSquare"
import generatePuzzle from "../logic/generatePuzzle"

export default class SumPuzzle extends React.Component {
  constructor(props) {
    super(props);
    generatePuzzle(3);
  }

  renderSquare(row, col) {
    return(<GridSquare 
      row={row} 
      col={col} 
      white={row!==5 && col!==5 && (row%2 === 0 || col%2 === 0)}
    />);
  }

  render() {
    const grid = [];
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++)
        grid.push(this.renderSquare(i, j));
    }

    return (
      <div className="app-content">
        <div className="divider-line" />
        <div className="component-sum-puzzle">
          <div className="grid-container">
            {grid}
          </div>
        </div>
      </div>
    );
  }
  
}
