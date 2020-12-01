import React, { useState } from "react";

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
      <CounterOutput value={state.counter} />
      <CounterControl
        label="Increment"
        clicked={() => counterChangedHandler("inc")}
      />
      <CounterControl
        label="Decrement"
        clicked={() => counterChangedHandler("dec")}
      />
      <CounterControl
        label="Add 5"
        clicked={() => counterChangedHandler("add", 5)}
      />
      <CounterControl
        label="Subtract 5"
        clicked={() => counterChangedHandler("sub", 5)}
      />
    </div>
  );
};

export default counter;
