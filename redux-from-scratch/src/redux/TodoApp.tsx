import { deepFreeze } from "./helpers";
import { isEqual } from "lodash";
import { combineReducers } from "redux";
import { storeTodo } from "./store";

export interface Action {
  type: ActionType;
  id?: number;
  text?: string;
  filter?: Visibility;
}

export enum ActionType {
  "ADD_TODO",
  "TOGGLE_TODO",
  "SET_VISIBILITY_FILTER",
}

export enum Visibility {
  "SHOW_ALL" = "SHOW_ALL",
  "SHOW_COMPLETED" = "SHOW_COMPLETED",
  "SHOW_UNCOMPLETED" = "SHOW_UNCOMPLETED",
}

export interface Todo {
  id: number;
  text: string;
  completeStatus: boolean;
}

interface TodoAppType {
  todos: Todo[];
  filter: Visibility;
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

const visibilityFilterReducer = (
  stateFilter: Visibility = Visibility.SHOW_ALL,
  action: Action
) => {
  switch (action.type) {
    case ActionType.SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return stateFilter;
  }
};

// Top tree reducer (be carefull to initialize state in props !)
export const todoReducers = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case ActionType.ADD_TODO:
      return [...state, todoReducer(undefined, action)];
    case ActionType.TOGGLE_TODO:
      return state.map((todo) => todoReducer(todo, action));
    default:
      return state;
  }
};

// Reducer composition
// Redux
export const todoApp = combineReducers({
  todos: todoReducers,
  visibilityFilter: visibilityFilterReducer,
});

// Custom
const customCombineReducers = (reducers: any) => {
  return (state = Object(), action: Action) => {
    return Object.keys(reducers).reduce((nextState: any, index) => {
      nextState[index] = reducers[index](state[index], action);
      return nextState;
    }, {});
  };
};

export const customCombineTodoApp = customCombineReducers({
  todos: todoReducers,
  visibilityFilter: visibilityFilterReducer,
});

// Combine Reducers details
const customTodoApp = (
  stateApp: TodoAppType = { todos: [], filter: undefined },
  action: Action
) => {
  return {
    todos: todoReducers(stateApp.todos, action),
    visibilityFilter: visibilityFilterReducer(stateApp.filter, action),
  };
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

let iTodo = 0;
const TodoApp = (todos: Todo[]) => {
  return (
    <div>
      <button
        onClick={() => {
          storeTodo.dispatch({
            type: ActionType.ADD_TODO,
            id: iTodo++,
            text: "Test",
          });
        }}
      >
        Add Todo
      </button>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
