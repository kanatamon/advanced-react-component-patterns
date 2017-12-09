import React from 'react';
import Toggle from './Toggle';
import Switch from 'react-ios-switch';

class App extends React.Component {
  render() {
    return (
      <Toggle
        defaultOn={true}
        onToggle={on => console.log('on', on)}
        render={({ on, toggle , reset}) => (
          <div>
            <Switch onChange={toggle} checked={on} />
            <button onClick={() => reset()}>Reset</button>
          </div>
        )}
      />
    );
  }
}

export default App;
