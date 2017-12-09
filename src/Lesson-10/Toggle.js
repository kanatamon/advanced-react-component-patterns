import React from "react";
import PropTypes from "prop-types";
import Switch from "react-ios-switch";
import hoistNonReactStatics from 'hoist-non-react-statics';

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
  /*
    hoistNonReactStatics(targetComponent, sourceComponent)
    เอา static properties จาก sourceComponent ในกรณีนี้คือ Component
    มาใส่ใน static properties ของ targetComponent ในกรณีนี้ึืคือ Wrapper

    ประโยชน์ก็คือ:
    เราจะสามารถใช้ static properties ของ Component ที่ผ่าน Higher Order Component ได้ตรงๆ

    eg.
    
    ...
    MyComponent.MyStatics = () => console.log('Yolo)
    ...

    const MyComponentWithToggle = withToggle(MyComponent);
    
    *** in case of hoistNonReactStatics(...)
    ok -> MyComponentWithToggle.MyStatics()

    *** in case of WITHOUT hoistNonReactStatics(...)
    failed -> MyComponentWithToggle.MyStatics()
  */
  return hoistNonReactStatics(Wrapper, Component);
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
