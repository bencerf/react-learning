import { createStore } from "redux";
import { todoApp, todoReducers } from "./ToggleTodo";

// Reducers
const counterReducers = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

// Custom store initialization
const customCreateStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return (() => {
      listeners = listeners.filter(l => l !== listener);
    });
  }

  dispatch({});

  return { getState, dispatch, subscribe };
}

export const storeCounter = customCreateStore(counterReducers);
console.log('Initial storeCounter state: ');
console.log(storeCounter.getState());

// export const storeTodo = createStore(todoReducers);
export const storeTodo = customCreateStore(todoApp);
console.log('Initial storeTodo state: ');
console.log(storeTodo.getState());