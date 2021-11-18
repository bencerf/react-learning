import { deepFreeze } from "./helpers";
import { isEqual } from "lodash";

export interface Action {
  type: ActionType;
  id: number;
  text?: string;
}

export enum ActionType {
  "ADD_TODO",
  "TOGGLE_TODO",
}

export interface Todo {
  id: number;
  text: string;
  completeStatus: boolean;
}

// Reducer Composition

// Leaf tree reducer
export const todoReducer = (stateElt: Todo, action: Action): Todo => {
  switch (action.type) {
    case ActionType.ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completeStatus: false,
      };
    case ActionType.TOGGLE_TODO:
      return stateElt.id === action.id
        ? {
            ...stateElt,
            completeStatus: !stateElt.completeStatus,
          }
        : stateElt;
    default:
      return stateElt;
  }
};

// Top tree reducer
export const todoReducers = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case ActionType.ADD_TODO:
      return [...state, todoReducer(undefined, action)];
    case ActionType.TOGGLE_TODO:
      return state.map((todo) => todoReducer(todo, action));
    default:
      return state;
  }
};

// Tests Reducers
const testAddTodo = () => {
  console.log("testAddTodo");

  const stateBefore: Todo[] = [];
  const addTodo: Action = {
    type: ActionType.ADD_TODO,
    id: 0,
    text: "Learn Redux",
  };
  const stateAfter: Todo[] = [
    {
      id: 0,
      text: "Learn Redux",
      completeStatus: false,
    },
  ];

  deepFreeze(stateBefore);
  deepFreeze(stateAfter);

  return isEqual(todoReducers(stateBefore, addTodo), stateAfter);
};

const testToggleTodo = () => {
  console.log("testToggleTodo");

  const stateBefore: Todo[] = [
    {
      id: 0,
      text: "Learn Redux",
      completeStatus: false,
    },
    {
      id: 1,
      text: "Learn React",
      completeStatus: false,
    },
  ];
  const toggleTodo: Action = {
    type: ActionType.TOGGLE_TODO,
    id: 1,
  };
  const stateAfter: Todo[] = [
    {
      id: 0,
      text: "Learn Redux",
      completeStatus: false,
    },
    {
      id: 1,
      text: "Learn React",
      completeStatus: true,
    },
  ];

  deepFreeze(stateBefore);
  deepFreeze(stateAfter);

  console.log(todoReducers(stateBefore, toggleTodo));
  console.log(stateAfter);

  return isEqual(todoReducers(stateBefore, toggleTodo), stateAfter);
};

testAddTodo() && testToggleTodo()
  ? console.log("# All tests Todo passed !!")
  : console.log("# Tests Todo failed !!");

const ToggleTodo = () => {
  return <></>;
};

export default ToggleTodo;
