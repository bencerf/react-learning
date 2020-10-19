import React from 'react';
import './UserInput.css';

const userInput = props => {
  const style = {
    color: 'red',
    font: 'inherit',
    // margin: '5px auto 5px auto',
    "margin-top": '5px',
    "margin-right": 'auto',
    "margin-bottom": '5px',
    "margin-left": 'auto'
  };

  return (
    <div className="UserInput">
      <p id="no-margin-bottom">Please enter a value:</p>
      <input
        type="text"
        onChange={props.onChange}
        value={props.value}
        placeholder="Please type something"
        style={style}/>

      <button onClick={props.onClick}>Reset</button>
    </div>
  )
}

export default userInput;