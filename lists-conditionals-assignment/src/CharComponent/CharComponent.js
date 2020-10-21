import React from 'react';
import './CharComponent.css';

const charComponent = props => {
  return (
    <div className="CharComponent" onClick={props.click}>
      {props.char}
    </div>
  );
}

export default charComponent;