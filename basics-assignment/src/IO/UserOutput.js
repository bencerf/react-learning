import React from 'react';
import './UserOutput.css';

const userOutput = props => {
  return (
    <div className="UserOutput">
      <p>You're typing : {props.username}</p>
      <p>A-MA-ZING, isn't it ?</p>
    </div>
  )
}

export default userOutput;