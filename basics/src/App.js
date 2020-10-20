import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

import Person from './Person/Person';

const app = props => {
  const [state, setState] = useState({
    persons: [
      { id: 'id1', name: 'Max', age: '28' },
      { id: 'id2', name: 'Manu', age: '29' },
      { id: 'id3', name: 'Steph', age: '26' }
    ],
    otherState: 'some other value (erase if not copy by using useState hooks in functional component',
    showPersons: true
  });

  // const switchNameHandler = (newName) => {
  //   // console.log('Was clicked !')
  //   // console.log(state);
  //   setState({
  //     persons: [
  //       { name: newName, age: '28' },
  //       { name: 'Manuel', age: '29' },
  //       { name: 'Stephanie', age: '26' }
  //     ],
  //     showPersons: state.showPersons // copy
  //   });
  // };

  const nameChangedHandler = ( event, id ) => {
    const personIndex = state.persons.findIndex(p => {
      return p.id === id;
    });
    
    // !WRONG! const person = state.persons[personIndex]; // DO NOT mutable directly throught pointer
    const person = {
      ...state.persons[personIndex]
    };
    // const person = Object.assign({}, state.persons[personIndex]);
    
    person.name = event.target.value;

    const persons = [...state.persons]; // copy
    persons[personIndex] = person;

    setState({
      persons: persons,
      showPersons: state.showPersons // copy
    });
  };

  const deletePersonHandler = (personIndex) => {
    // Be careful not to update the an immutable state, and make a copy instead
    // const persons = state.persons.slice();
    const persons = [...state.persons];
    persons.splice(personIndex, 1);
    setState({
      persons: persons,
      showPersons: state.showPersons
    });
  };

  const togglePersonsHandler = () => {
    // console.log("--- togglePersonsHandler - BEGIN");
    // console.log(state);
    const doesShow = state.showPersons;
    setState({
      persons: state.persons,
      showPersons: !doesShow
    });
    // console.log("--- togglePersonsHandler - END");
    // console.log(state);
  };

  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };

  // console.log(state)

  let persons = null;

  if (state.showPersons) {
    persons = (
      <div>
        {state.persons.map((person, index) => {
          return (
            <Person
              // Add a key in a list 
              key={person.id}
              name={person.name}
              age={person.age}
              click={() => deletePersonHandler(index)}
              // click={deletePersonHandler.bind(this, index)}
              changed={(event) => nameChangedHandler(event, person.id)}
            />
          )
        })}
        {/* <Person
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
          age={state.persons[2].age} /> */}
      </div>
    );
  }

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
        onClick={togglePersonsHandler}
      >
        Toggle Persons
      </button>

      {/* <div v-if> */}

      {/* // Rendering Content Conditionnaly (delete comments) */}

      {/* {
      state.showPersons === true ?
      // React.createElement(<div></div>) behind */}
      {persons}
      {/* : null
      } */}
    </div>
  );
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App !!!'));
};

export default app;
