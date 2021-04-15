import React from "react";
import PropTypes from "prop-types";
import "./GridSquare.css";

export default class GridSquare extends React.Component {
  static propTypes = {
    row: PropTypes.number,
    col: PropTypes.number,
    handleClick: PropTypes.func,
    white: PropTypes.bool,
    operation: PropTypes.string,
    readOnly: PropTypes.bool,
    text: PropTypes.string,
  };

  handleClick = () => {
    this.props.handleClick();
  }

  render() {
    const className = [
      "component-grid-square",
      this.props.white ? "white" : "black"
    ];

    return (
      <div className={className.join(" ").trim()}>
        <div className="content">
          <div className="text-container">
            <div className="text">{this.props.text}</div>
          </div>
        </div>
      </div>
    );
  }
}