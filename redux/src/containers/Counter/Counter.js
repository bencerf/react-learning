import React, { useState } from "react";
import { connect } from 'react-redux';

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

const counter = (props) => {
  const [state, setState] = useState({
    counter: 0,
  });

  const counterChangedHandler = (action, value) => {
    switch (action) {
      case "inc":
        setState((prevState) => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case "dec":
        setState((prevState) => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case "add":
        setState((prevState) => {
          return { counter: prevState.counter + value };
        });
        break;
      case "sub":
        setState((prevState) => {
          return { counter: prevState.counter - value };
        });
        break;
    }
  };

  return (
    <div>
      <CounterOutput value={props.ctr} />
      <CounterControl
        label="Increment"
        clicked={props.onIncrementCounter}
      />
      <CounterControl
        label="Decrement"
        clicked={props.onDecrementCounter}
      />
      <CounterControl
        label="Add 5"
        clicked={props.onAddCounter}
      />
      <CounterControl
        label="Subtract 5"
        clicked={props.onSubtractCounter}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ctr: state.counter
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({ type: 'INCREMENT'}),
    onDecrementCounter: () => dispatch({ type: 'DECREMENT'}),
    onAddCounter: () => dispatch({ type: 'ADD', value: 5}),
    onSubtractCounter: () => dispatch({ type: 'SUBTRACT', value: 5}),
  };
}

// Function which return higher order component with state map into props
export default connect(mapStateToProps, mapDispatchToProps)(counter);
