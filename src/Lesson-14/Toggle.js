import React from "react";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = { on: this.props.defaultOn };
    this.state = this.initialState;
  }

  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );

  reset = () =>
    this.setState(
      this.initialState,
      () => this.props.onReset(this.state.on),
    );

  render() {
    return this.props.render({
      on: this.state.on,
      toggle: this.toggle,
      reset: this.reset,
    });
  }
}

Toggle.defaultProps = {
  onToggle: () => null,
  onReset: () => null,
  render: () => null,
};

export default Toggle;
