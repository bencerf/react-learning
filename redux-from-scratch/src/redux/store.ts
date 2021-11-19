import { createStore } from "redux";
import { Dispatch } from "redux";
import { AnyAction } from "redux";
import { Reducer, Store } from "redux";
import { todoApp, todoReducers, customCombineTodoApp, Action, Visibility, Todo } from "./TodoApp";

// Custom store initialization

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

// const createStoreTodoApp = (reducer: Reducer): Store<CombinedState, AnyAction> => {
//   let state;
//   let listeners: CallableFunction[] = [];

//   const getState = () => state;

//   const dispatch = (action: Action): Dispatch<AnyAction> => {
//     state = reducer(state, action);
//     listeners.forEach(listener => listener());
//     return;
//   };

//   const subscribe = (listener) => {
//     listeners.push(listener);
//     return (() => {
//       listeners = listeners.filter(l => l !== listener);
//     });
//   }

//   dispatch({} as AnyAction);

//   return { getState, dispatch, subscribe };
// }


interface CombinedReducers {
  todos: (state: Todo[], action: Action) => Todo[];
  visibilityFilter: (stateFilter: Visibility, action: Action) => Visibility;
}

type CombinedState = Todo[] | Visibility;


export const storeCounter = customCreateStore(counterReducers);
console.log('Initial storeCounter state: ');
console.log(storeCounter.getState());

export const storeTodo = createStore(todoApp);
// export const storeTodo = customCreateStore(todoApp);
console.log('Initial storeTodo state: ');
console.log(storeTodo.getState());
