import React from "react";
import { withToggle } from "./Toggle";

class MyButton extends React.Component {
  focus = () => this.button.focus();
  render() {
    const { toggle, on } = this.props.toggleProps;
    return (
      <button
        onClick={toggle}
        ref={button => this.button = button}
      >
        {on ? "on" : "off"}
      </button>
    );
  }
}

export default withToggle(MyButton);
