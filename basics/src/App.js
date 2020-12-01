import React, { useState } from "react";
import Radium, { StyleRoot } from "radium";
// import logo from './logo.svg';

import "./App.css";
import classes from "./App.module.css";
import Person from "./Person/Person";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

const app = (props) => {
  const [state, setState] = useState({
    persons: [
      { id: "id1", name: "Max", age: "28" },
      { id: "id2", name: "Manu", age: "29" },
      { id: "id3", name: "Steph", age: "26" },
    ],
    otherState:
      "some other value (erase if not copy by using useState hooks in functional component",
    showPersons: false,
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

  const nameChangedHandler = (event, id) => {
    const personIndex = state.persons.findIndex((p) => {
      return p.id === id;
      // Error Debugging
      // return p.userid === id;
    });

    // !WRONG! const person = state.persons[personIndex]; // DO NOT mutable directly throught pointer
    const person = {
      ...state.persons[personIndex],
    };
    // const person = Object.assign({}, state.persons[personIndex]);

    person.name = event.target.value;
    //  Error Debugging
    // person.name = event.input.value;

    const persons = [...state.persons]; // copy
    persons[personIndex] = person;

    setState({
      persons: persons,
      showPersons: state.showPersons, // copy
    });
  };

  const deletePersonHandler = (personIndex) => {
    // Be careful not to update the an immutable state, and make a copy instead
    // const persons = state.persons.slice();
    const persons = [...state.persons];
    persons.splice(personIndex, 1);
    setState({
      persons: persons,
      showPersons: state.showPersons,
    });
  };

  const togglePersonsHandler = () => {
    // console.log("--- togglePersonsHandler - BEGIN");
    // console.log(state);
    const doesShow = state.showPersons;
    setState({
      persons: state.persons,
      showPersons: !doesShow,
    });
    // console.log("--- togglePersonsHandler - END");
    // console.log(state);
  };

  // console.log(state)

  /* Styling */

  const assignedClasses = []; // "red bold"
  if (state.persons.length <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (state.persons.length <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  /* Person Component */

  let persons = null;

  // NB: Replace by btnClass below
  // const style = {
  //   backgroundColor: 'green',
  //   color: 'white',
  //   font: 'inherit',
  //   border: '1px solid blue',
  //   padding: '8px',
  //   cursor: 'pointer',
  //   ':hover': {
  //     backgroundColor: 'lightgreen',
  //     color: 'black'
  //   }
  // };

  let btnClass = "";

  if (state.showPersons) {
    persons = (
      <div>
        {state.persons.map((person, index) => {
          return (
            <ErrorBoundary key={person.id}>
              <Person
                // Add a key in a list
                name={person.name}
                age={person.age}
                click={() => deletePersonHandler(index)}
                // click={deletePersonHandler.bind(this, index)}
                changed={(event) => nameChangedHandler(event, person.id)}
              />
            </ErrorBoundary>
          );
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

    // style.backgroundColor = 'red';
    // style[':hover'] = {
    //   backgroundColor: 'salmon',
    //   color: 'black'
    // }

    btnClass = classes.Red;
  }

  return (
    <StyleRoot>
      <div className={classes.App}>
        {/* <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p> */}

        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(" ")}>This is really working!</p>
        <button
          // style={style}
          // className="button"
          className={btnClass}
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
    </StyleRoot>
  );
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App !!!'));
};

export default Radium(app);
