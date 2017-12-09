import React from 'react';
import Toggle from './Toggle';
import Switch from 'react-ios-switch';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      timesClicked: 0,
      on: false,
    };
    this.state = this.initialState;
  }

  handleToggle = () => this.setState(({ on, timesClicked }) => ({
    on: timesClicked > 4 ? false : !on,
    timesClicked: timesClicked + 1,
  }));

  handleReset = () => this.setState(this.initialState);

  render() {
    const isLimited = this.state.timesClicked > 4;
    const resetButton = isLimited && <button onClick={this.handleReset}>Reset</button>;
    const display = isLimited
      ? <div>Whole please click reset</div>
      : <div>{`Click count: ${this.state.timesClicked}`}</div>
    return (
      <Toggle
        on={this.state.on}
        onToggle={this.handleToggle}
        onReset={this.handleReset}
        render={({ on, toggle , reset}) => (
          <div>
            <Switch onChange={toggle} checked={on} />
            {display}
            {resetButton}
          </div>
        )}
      />
    );
  }
}

export default App;
