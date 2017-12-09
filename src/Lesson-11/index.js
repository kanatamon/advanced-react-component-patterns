import React from 'react';
import Toggle from './Toggle';
import Switch from 'react-ios-switch';

class App extends React.Component {
  render() {
    return (
      <Toggle
        onToggle={on => console.log('on', on)}
        render={({ on, toggle }) => (
          <div>
            <Switch onChange={toggle} checked={on} />
          </div>
        )}
      />
    );
  }
}

export default App;
