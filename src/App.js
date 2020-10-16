import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

import Person from './Person/Person';

// class App extends Component {
const app = props =>
{
  const [ personsState, setPersonsState ] = useState( {
    persons: [
      { name:'Max', age:'28' },
      { name:'Manu', age:'29' },
      { name:'Steph', age:'26' }
    ],
    // otherState: 'some other value'
  });

  // useState({ otherState: 'some other value' })
  const [otherState, setOtherState]  = useState('some other value');
  
  console.log(personsState, otherState);

  const switchNameHandler = () => {
    // console.log('Was clicked !')
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    setPersonsState( {
      persons: [
        { name:'Maximilian', age:'28' },
        { name:'Manuel', age:'29' },
        { name:'Stephanie', age:'26' }
      ]
      // Copy otherState because useState Hook replace current state
      // otherState: personsState.otherState
    });
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
      <button onClick={switchNameHandler} >Switch Name</button>

      <Person 
        name={personsState.persons[0].name}
        age={personsState.persons[0].age}/>
      <Person
        name={personsState.persons[1].name}
        age={personsState.persons[1].age}
        >
          My Hobbies: Racing !
      </Person>
      <Person
        name={personsState.persons[2].name}
        age={personsState.persons[2].age}/>
    </div>
  );
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App !!!'));
};

export default app;