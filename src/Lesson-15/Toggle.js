import React from "react";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = { on: this.props.defaultOn };
    this.state = this.initialState;
  }

  toggle = () => {
    if (this.isOnControlled()) {
      this.props.onToggle(!this.props.on);
    } else {
      console.log('controll by component itself');
      this.setState(
        ({ on }) => ({ on: !on }),
        () => this.props.onToggle(this.state.on),
      );
    }
  }
    
  reset = () => {
    if (this.isOnControlled()) {
      this.props.onReset(!this.props.on);
    } else {
      this.setState(
        this.initialState,
        () => this.props.onReset(this.state.on),
      );
    }
  }
    
  isOnControlled = () => this.props.on !== undefined;  

  render() {
    return this.props.render({
      on: this.isOnControlled()
        ? this.props.on
        : this.state.on,
      toggle: this.toggle,
      reset: this.reset,
    });
  }
}

Toggle.defaultProps = {
  defaultOn: true,
  onToggle: () => null,
  onReset: () => null,
  render: () => null,
};

export default Toggle;
