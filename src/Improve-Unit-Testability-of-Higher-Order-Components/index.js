import React from 'react';
import Toggle from './Toggle';
import MyButtonToggle from './MyButtonToggle';

class App extends React.Component {
  render() {
    return (
      <Toggle
        onToggle={on => on ? this.myToggle.focus() : null}
      >
        <Toggle.Button />
        <Toggle.On>The button is on.</Toggle.On>
        <Toggle.Off>The button is off.</Toggle.Off>
        <MyButtonToggle
          innerRef={myToggle => this.myToggle = myToggle}
        />
      </Toggle>
    );
  }
}

export default App;
