import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

import Person from './Person/Person';

const app = props => {
  const [state, setState] = useState({
    persons: [
      { name: 'Max', age: '28' },
      { name: 'Manu', age: '29' },
      { name: 'Steph', age: '26' }
    ],
    otherState: 'some other value'
  });

  const switchNameHandler = (newName) => {
    // console.log('Was clicked !')
    setState({
      persons: [
        { name: newName, age: '28' },
        { name: 'Manuel', age: '29' },
        { name: 'Stephanie', age: '26' }
      ]
    })
  };

  const nameChangedHandler = (event) => {
    setState({
      persons: [
        { name: 'Max', age: '28' },
        { name: event.target.value, age: '29' },
        { name: 'Stephanie', age: '26' }
      ]
    })
  };

  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };

  return (
    <div className="App">
      {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}

      <h1>Hi, I'm a React App</h1>
      <p>Thi is really working!</p>
      <button
        style={style}
        onClick={() => switchNameHandler('Maximiian !!')}
      >
        Switch Name
      </button>

      <Person
        name={state.persons[0].name}
        age={state.persons[0].age} />
      <Person
        name={state.persons[1].name}
        age={state.persons[1].age}
        click={switchNameHandler.bind(this, 'Max')}
        changed={nameChangedHandler}
      >
        My Hobbies: Racing !
      </Person>
      <Person
        name={state.persons[2].name}
        age={state.persons[2].age} />
    </div>
  );
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App !!!'));
};

export default app;
