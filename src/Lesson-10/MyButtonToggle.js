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

MyButton.ToggleMessage = withToggle(({ toggleProps: { on }}) => {
  return on
    ? 'Warning: the button is toggled on'
    : null;
});

export default withToggle(MyButton);
