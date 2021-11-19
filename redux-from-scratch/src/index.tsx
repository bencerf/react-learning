import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { storeCounter, storeTodo } from "./redux/store";
import Counter from "./redux/Counter";
import TodoApp, { Visibility } from "./redux/TodoApp";
import { ActionType } from "./redux/TodoApp";
import reportWebVitals from "./reportWebVitals";
import { objectContaining } from "expect";

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      {/* <App /> */}
      <Counter
        storeValue={storeCounter.getState()}
        onIncrement={() => storeCounter.dispatch({ type: "INCREMENT" })}
        onDecrement={() => storeCounter.dispatch({ type: "DECREMENT" })}
      />
      <hr></hr>
      <TodoApp {...storeTodo.getState()} />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

storeCounter.subscribe(render);
storeTodo.subscribe(render);

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Action in storeTodo
console.log("Dispatching ADD_TODO");
storeTodo.dispatch({
  type: ActionType.ADD_TODO,
  id: 0,
  text: "Learn Redux",
});
console.log("Current storeTodo state:");
console.log(storeTodo.getState());
console.log("---------------------");

console.log("Dispatching ADD_TODO");
storeTodo.dispatch({
  type: ActionType.ADD_TODO,
  id: 1,
  text: "Learn React",
});
console.log("Current storeTodo state:");
console.log(storeTodo.getState());
console.log("---------------------");

console.log("Dispatching TOGGLE_TODO");
storeTodo.dispatch({
  type: ActionType.TOGGLE_TODO,
  id: 1,
});
console.log("Current storeTodo state:");
console.log(storeTodo.getState());
console.log("---------------------");

console.log("Dispatching SET_VISIBILITY_FILTER");
storeTodo.dispatch({
  type: ActionType.SET_VISIBILITY_FILTER,
  filter: Visibility.SHOW_COMPLETED,
});
console.log("Current storeTodo state:");
console.log(storeTodo.getState());
console.log("---------------------");
