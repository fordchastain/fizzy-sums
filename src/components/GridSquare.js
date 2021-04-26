import React from "react";
import PropTypes from "prop-types";
import "./GridSquare.css";
import addIcon from "./img/add.svg";
import subtractIcon from "./img/subtract.svg";
import multiplyIcon from "./img/multiply.svg";
import divideIcon from "./img/divide.svg";

export default class GridSquare extends React.Component {
  static propTypes = {
    row: PropTypes.number,
    col: PropTypes.number,
    handleInput: PropTypes.func,
    white: PropTypes.bool,
    operation: PropTypes.bool,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
    puzzleSize: PropTypes.number,
    greenText: PropTypes.bool,
    redText: PropTypes.bool,
    text: PropTypes.string
  };

  handleClick = () => {
    if (typeof this.input !== "undefined") 
      this.input.focus();
  }

  handleInput = (event) => {
    this.props.handleInput(this.props.row, this.props.col, event.target.value);
  }

  renderContent() {
    if (this.props.readOnly) {
      if (this.props.operation) {
        return (
          <div className="operation">
            <img src={this.props.value==="+" ? addIcon : 
                      this.props.value==="-" ? subtractIcon :
                      this.props.value==="*" ? multiplyIcon :
                      divideIcon} />
          </div>
        );
      }
      return (
        <div className="text">
          {this.props.value}
        </div>
      );
    } else {
      return (
        <input type="text" 
          maxLength={this.props.puzzleSize===4 ? 2 : 1} 
          ref={(inp) => this.input = inp}
          className={this.props.puzzleSize===3 ? "single-digit" : "double-digit"}
          onChange={this.handleInput}
          value={this.props.text}
        />
      );
    }
  }

  render() {
    const className = [
      "component-grid-square",
      this.props.white ? "white" : "black",
      this.props.readOnly ? "" : "input",
      this.props.greenText ? "green-text" : "",
      this.props.redText ? "red-text" : ""
    ];

    let content = this.renderContent();

    return (
      <div className={className.join(" ").trim()} onClick={this.handleClick}>
        <div className="content">
          <div className="text-container">
            {content}
          </div>
        </div>
      </div>
    );
  }
}