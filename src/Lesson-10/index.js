import React from 'react';
import Toggle from './Toggle';
import MyButtonToggle from './MyButtonToggle';

class App extends React.Component {
  render() {
    return (
      <Toggle
        onToggle={on => on ? this.myToggle.focus() : null}
      >
        <MyButtonToggle
          innerRef={myToggle => this.myToggle = myToggle}
        />
        <MyButtonToggle.ToggleMessage />
      </Toggle>
    );
  }
}

export default App;
