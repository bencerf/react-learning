import React from 'react';

const validationComponent = props => {
  let message = null;

  if(props.inputLength >= 5) {
    message = (
      <div>
        <p>Text long enough</p>
      </div>
    );
  }
  else {
    message = (
      <div>
        <p>Text too short</p>
      </div>
    );
  }

  return (
    message
  )
}

export default validationComponent;