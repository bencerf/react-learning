import { createStore } from "redux";
import { Dispatch } from "redux";
import { Reducer } from "redux";
import { todoAppReducers, Action, CombinedState, customTodoApp } from "./TodoApp";

// Custom store initialization to Counter (generic)
const customCreateStore = (reducer: any) => {
  let state: any;
  let listeners: any[] = [];
  
  const getState = () => state;
  
  const dispatch = (action: any) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  
  const subscribe = (listener: any) => {
    listeners.push(listener);
    return (() => {
      listeners = listeners.filter(l => l !== listener);
    });
  }
  
  dispatch({});
  
  return { getState, dispatch, subscribe };
}

// Custom store initialization for Todo (typed)
const customCreateStoreTodoApp = (reducer: Reducer) => {
  let state: CombinedState;
  let listeners: CallableFunction[] = [];

  const getState = () => state;

  const dispatch = (action: Action): Dispatch<Action> => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
    return;
  };

  const subscribe = (listener: CallableFunction): CallableFunction => {
    listeners.push(listener);
    return (() => {
      listeners = listeners.filter(l => l !== listener);
    });
  }

  dispatch({} as Action);

  return { getState, dispatch, subscribe };
}


// Reducers
const counterReducers = (state = 0, action: any) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};
export const storeCounter = customCreateStore(counterReducers);
console.log('Initial storeCounter state: ');
console.log(storeCounter.getState());

export const storeTodo = customCreateStoreTodoApp(customTodoApp);
// export const storeTodo = createStore(todoAppReducers);
console.log('Initial storeTodo state: ');
console.log(storeTodo.getState());
