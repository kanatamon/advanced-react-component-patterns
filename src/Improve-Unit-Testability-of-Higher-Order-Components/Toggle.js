import React from "react";
import PropTypes from "prop-types";
import Switch from "react-ios-switch";

const TOGGLE_CONTEXT = "__toggle__";

export function withToggle(Component) {
  const Wrapper = ({ innerRef, ...props }, context) => {
    const toggleContext = context[TOGGLE_CONTEXT];
    return (
      <Component
        ref={innerRef}
        toggleProps={toggleContext}
        {...props}
      />
    );
  };
  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
  };
  Wrapper.displayName = `withToggle(${Component.displayName | Component.name})`;
  Wrapper.WrappedComponent = Component;
  return Wrapper;
}

const ToggleOn = ({ children, toggleProps }) => {
  return toggleProps.on ? children : null;
};

const ToggleOff = ({ children, toggleProps }) => {
  return toggleProps.on ? null : children;
};

const ToggleButton = ({ toggleProps: { toggle, on }, ...props }) => {
  return <Switch onChange={toggle} checked={on} {...props} />
};

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { on: false };
  }

  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );

  getChildContext() {
    return {
      [TOGGLE_CONTEXT]: {
        on: this.state.on,
        toggle: this.toggle
      }
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

Toggle.On = withToggle(ToggleOn);
Toggle.Off = withToggle(ToggleOff);
Toggle.Button = withToggle(ToggleButton);

Toggle.defaultProps = {
  onToggle: () => null
};

Toggle.childContextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};

export default Toggle;
