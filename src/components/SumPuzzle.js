import React from "react"
import './SumPuzzle.css';
import Button from "./Button";
import GridSquare from "./GridSquare";
import Popup from "./Popup";
import generatePuzzle from "../logic/generatePuzzle";
import { calculateRow, calculateCol } from "../logic/calculate";

export default class SumPuzzle extends React.Component {
  constructor(props) {
    super(props);
    this.size = 3;
    this.puzzle = generatePuzzle(3);

    this.state = {
      grid: [],
      popupVisible: false
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
      if (this.isPuzzleComplete() && this.isPuzzleCorrect())
        this.setState({popupVisible: true});
    }); 
  }

  togglePopup = () => {
    this.setState({popupVisible: !this.state.popupVisible});
  }

  newGame = () => {
    this.setState({grid: []});
    this.size = 3;
    this.puzzle = generatePuzzle(3);
    this.initializeGrid();
  }

  isRowComplete = (row) => {
    if (typeof this.state.grid[row] === "undefined")
      return false;

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

  isPuzzleValid = () => {
    const gridSet = new Set();
    for (let i = 0; i < this.size*2-1; i+= 2) {
      for (let j = 0; j < this.size*2-1; j+=2) {
        if (this.state.grid[i][j] > 0 && this.state.grid[i][j] <= this.size*this.size)
          gridSet.add(this.state.grid[i][j]);
      }
    }

    if (gridSet.size != this.size*this.size)
      return false;
    else
      return true;
  }

  isPuzzleCorrect = () => {
    for (let i = 0; i < this.size*2-1; i+=2) {
      if (!this.isRowComplete(i) || !this.isColComplete(i))
        return false;
      if (!this.isRowCorrect(i) || !this.isColCorrect(i))
        return false;
    }
    return this.isPuzzleValid();
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

    let colCorrect = (row===end && this.isColComplete(col) && this.isColCorrect(col));
    let colIncorrect = (row===end && this.isColComplete(col) && !this.isColCorrect(col));
    let rowCorrect = (col===end && this.isRowComplete(row) && this.isRowCorrect(row));
    let rowIncorrect = (col===end && this.isRowComplete(row) && !this.isRowCorrect(row));

    return(<GridSquare 
      key={"id"+row+"-"+col}
      row={row} 
      col={col} 
      white={row!==end && col!==end && (row%2 === 0 || col%2 === 0)}
      value={""+text}
      readOnly={row%2===0 && col%2===0 ? false : true}
      operation={row!==end && col!==end && ((row%2===0 && col%2!==0) || (row%2!==0 && col%2===0))}
      puzzleSize={this.size}
      handleInput={this.handleInput}
      greenText={colCorrect || rowCorrect}
      redText={colIncorrect || rowIncorrect}
      text={typeof this.state.grid[row] === "undefined" ? "" : this.state.grid[row][col]}
    />);
  }

  render() {
    const grid = [];
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++)
        grid.push(this.renderSquare(i, j));
    }

    return (
      <div>
        {this.state.popupVisible ? <Popup text="Congrats! You solved the puzzle!" toggle={this.togglePopup}/> : null} 
        <div className="app-content">
          <div className="divider-line" />
          <div className="button-bar">
            <div className="button-container">
              <Button text={"New Game"} handleClick={this.newGame} green={true}/>
            </div>
            <div className="button-container">
              <a href="about.html"><Button text={"How to Play"} green={false} /></a>
            </div>
          </div>
          <div className="component-sum-puzzle">
            <div className="grid-container">
              {grid}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
