import React, { useState } from 'react';
import './App.css';

import ValidationComponent from './Validation/ValidationComponent.js';
import CharComponent from './CharComponent/CharComponent.js';

const app = props => {
  const [userInputState, userInputSetState] = useState({
    value: ''
  });

  const userInputChangedEventHandler = (event) => {
    userInputSetState({
      value: event.target.value
    });
  };

  const removeCharAt = (charIndex) => {
    let charactersUserInputArr = userInputState.value.split('');

    if (charactersUserInputArr.length !== 0) {
      charactersUserInputArr.splice(charIndex, 1);
      // let valueRetrievedArr = charactersUserInputArr.splice(charIndex, 1); // /!\ return array of REMOVED elements
      let valueRetrieved = charactersUserInputArr.join('');

      userInputSetState({
        value: valueRetrieved
      });
    }
  };

  const charComponentList = userInputState.value.split('').map((char, index) => {
    return (
      <CharComponent
        key={index}
        char={char}
        click={() => removeCharAt(index)} />
    )
  });

  return (
    <div className="App">
      <p><u><b>Lists Conditionals Assignment Instructions</b></u></p>
      <ol>
        <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph). (use statefull)</li>
        <li>Create a new component (={">"} ValidationComponent) which receives the text length as a prop</li>
        <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
        <li>Create another component (={">"} CharComponent) and style it as an inline box (={">"} display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
        <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop. (userInput.slipt('').map or .join(''))</li>
        <li>When you click a CharComponent, it should be removed from the entered text. ()</li>
      </ol>
      <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>

      <br />
      <p><u><b>Results:</b></u></p>
      <hr />
      <br />

      <input
        type="text"
        onChange={userInputChangedEventHandler}
        value={userInputState.value}
        placeholder="Type something" />
      <p>(Number of character: {userInputState.value.length})</p>

      <ValidationComponent inputLength={userInputState.value.length}>
      </ValidationComponent>

      {charComponentList}
    </div>
  );
}

export default app;
