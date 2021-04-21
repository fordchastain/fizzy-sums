import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

export default class Button extends React.Component {
  static propTypes = {
    handleClick: PropTypes.func,
    text: PropTypes.string,
    green: PropTypes.bool
  };

  handleClick = () => {
    this.props.handleClick();
  }

  render() {
    const className = [
      "component-button",
      this.props.green ? "green" : "red"
    ];

    return (
      <div className={className.join(" ").trim()}>
        <button onClick={this.handleClick}>
          {this.props.text}
        </button>
      </div>
    );
  }
}