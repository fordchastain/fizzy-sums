import React from "react"
import logo from '../logo.svg';
import './SumPuzzle.css';
import GridSquare from "./GridSquare"
import generatePuzzle from "../logic/generatePuzzle"

export default class SumPuzzle extends React.Component {
  constructor(props) {
    super(props);
    this.size = 3;
    this.puzzle = generatePuzzle(3);
  }

  renderSquare(row, col) {
    let end = (typeof this.size === "undefined" ? 5 : this.size*2-1);
    let text = "";
    if (typeof this.puzzle.arr !== "undefined") {
      if (col < end && row < end)
        text = this.puzzle.arr[row][col];
      if (col === end && row%2 === 0) 
        text = "=" + this.puzzle.rowSums[Math.floor(row/2)];
      if (row === end && col%2 === 0)
        text = "=" + this.puzzle.colSums[Math.floor(col/2)];
    }

    return(<GridSquare 
      row={row} 
      col={col} 
      white={row!==end && col!==end && (row%2 === 0 || col%2 === 0)}
      value={text}
      readOnly={row%2===0 && col%2===0 ? false : true}
      operation={row!==end && col!==end && ((row%2===0 && col%2!==0) || (row%2!==0 && col%2===0))}
      puzzleSize={this.size}
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
