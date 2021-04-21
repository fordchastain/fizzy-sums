import React from "react"
import logo from '../logo.svg';
import './SumPuzzle.css';
import GridSquare from "./GridSquare"
import generatePuzzle from "../logic/generatePuzzle"
import { calculateRow, calculateCol } from "../logic/calculate"

export default class SumPuzzle extends React.Component {
  constructor(props) {
    super(props);
    this.size = 3;
    this.puzzle = generatePuzzle(3);

    this.state = {
      grid: []
    };
  }

  componentDidMount() {
    this.initializeGrid();
  }

  initializeGrid = () => {
    let copy = false;
    let grid = [];
    for (let i = 0; i < this.size*2-1; i++) {
      let inner = [];
      for (let j = 0; j < this.size*2-1; j++) {
        if (copy)
          inner[j] = this.puzzle.arr[i][j];
        else
          inner[j] = "";
        copy = !copy;
      }
      grid.push(inner);
    }
    this.setState({grid: grid});
  }

  handleInput = (row, col, value) => {
    this.setState({
      grid: this.state.grid.map((r, i) => r.map((c, j) => {
        return i===row && j===col ? value : c;
      }))
    }, () => {
      if (this.isRowComplete(row) && this.isRowCorrect(row))
        console.log("row " + row + " is correct!");
      if (this.isColComplete(col) && this.isColCorrect(col))
        console.log("col " + col + " is correct!");
      if (this.isPuzzleComplete() && this.isPuzzleCorrect())
        console.log("puzzle is correct!");
    }); 
  }

  isRowComplete = (row) => {
    for (let i = 0; i < this.state.grid[row].length; i++) {
      if (!this.state.grid[row][i])
        return false;
    }
    return true;
  }

  isRowCorrect = (row) => {
    return calculateRow(this.state.grid, row) === this.puzzle.rowSums[row/2];
  }

  isColComplete = (col) => {
    for (let i = 0; i < this.state.grid.length; i++) {
      if (!this.state.grid[i][col])
        return false;
    }
    return true;
  }

  isColCorrect = (col) => {
    return calculateCol(this.state.grid, col) === this.puzzle.colSums[col/2];
  }

  isPuzzleComplete = () => {
    for (let i = 0; i < this.size*2-1; i+=2) {
      if (!this.isRowComplete(i) || !this.isColComplete(i))
        return false;
    }
    return true;
  }

  isPuzzleCorrect = () => {
    for (let i = 0; i < this.size*2-1; i+=2) {
      if (!this.isRowComplete(i) || !this.isColComplete(i))
        return false;
      if (!this.isRowCorrect(i) || !this.isColCorrect(i))
        return false;
    }
    return true;
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
      handleInput={this.handleInput}
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
