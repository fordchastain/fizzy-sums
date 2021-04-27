import React from "react";
import PropTypes from "prop-types";
import "./Popup.css";
import check from "./img/check.svg";

export default class Popup extends React.Component {
  static propTypes = {
    toggle: PropTypes.func,
    text: PropTypes.string
  };

  handleClick = () => {
    this.props.toggle();
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.handleClick}>&times;</span><br />
          <div className="modal-icon">
            <img src={check} />
          </div>
          <p>{this.props.text}</p>
        </div>
      </div>
    );
  }
}