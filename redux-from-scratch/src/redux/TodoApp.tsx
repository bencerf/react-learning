import { deepFreeze } from "./helpers";
import { isEqual } from "lodash";
import { combineReducers } from "redux";
import { storeTodo } from "./store";
import { MouseEventHandler, useEffect, useRef, useState } from "react";

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
export const todoAppReducers = combineReducers({
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
export const customTodoApp = (
  stateApp: TodoAppType = { todos: [], filter: undefined },
  action: Action
) => {
  return {
    todos: todoReducers(stateApp.todos, action),
    visibilityFilter: visibilityFilterReducer(stateApp.filter, action),
  };
};

// interface CombinedReducers {
//   todos: (state: Todo[], action: Action) => Todo[];
//   visibilityFilter: (stateFilter: Visibility, action: Action) => Visibility;
// }

export interface CombinedState {
  todos: Todo[];
  visibilityFilter: Visibility;
}

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

//
// Todo Component
//
interface FilterLinkProps {
  filter: Visibility;
  currentFilter: Visibility;
  children: string;
}
const FilterLink = ({ filter, currentFilter, children }: FilterLinkProps) => {
  const handleFilter = (event: any) => {
    event.preventDefault();
    storeTodo.dispatch({
      type: ActionType.SET_VISIBILITY_FILTER,
      filter,
    });
  };

  return currentFilter === filter ? (
    <span>{children}</span>
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href="#" onClick={handleFilter}>
      {children}
    </a>
  );
};

// TodoElement
interface TodoElementProps {
  completeStatus: boolean;
  text: string;
  handleOnClick: any;
}
const TodoElement = ({
  completeStatus,
  text,
  handleOnClick,
}: TodoElementProps): React.ReactElement => (
  <li
    onClick={handleOnClick}
    style={{
      textDecoration: completeStatus ? "line-through" : "none",
    }}
  >
    {text}
  </li>
);

// TodoList
interface TodoListProps {
  todos: Todo[];
  visibilityFilter: Visibility;
  onTodoElementClick: any;
}
const TodoList = ({
  todos,
  visibilityFilter,
  onTodoElementClick,
}: TodoListProps): React.ReactElement => {
  const getVisibleTodos = (todos: Todo[], filter: Visibility) => {
    switch (filter) {
      case Visibility.SHOW_ALL:
        return todos;
      case Visibility.SHOW_COMPLETED:
        return todos.filter((todo) => todo.completeStatus);
      case Visibility.SHOW_UNCOMPLETED:
        return todos.filter((todo) => !todo.completeStatus);
    }
  };

  return (
    <ul>
      {getVisibleTodos(todos, visibilityFilter)?.map((todo) => (
        // <TodoElement key={todo.id} {...todo} />
        <TodoElement
          key={todo.id}
          {...todo}
          handleOnClick={() => onTodoElementClick(todo.id)}
        />
      ))}
    </ul>
  );
};

// TodoApp
const TodoApp = ({
  todos,
  visibilityFilter,
}: CombinedState): React.ReactElement => {
  const inputRef = useRef(null);
  const [textValue, setTextValue] = useState("");
  // const [visibleTodos, setVisibleTodos] = useState<Todo[]>();
  // console.log({ visibleTodos });
  console.log("render");
  // Should never change during whole component life (useState initial for the first render ONLY)
  const [initialIndexTodo, setInitialIndexTodo] = useState<number>();

  const handleTextInputChange = (event: any) => {
    // Prevent rerebdering each time typing
    event.preventDefault();

    setTextValue(event.target.value);
  };

  const handleAddTodo = () => {
    inputRef.current.focus();
    storeTodo.dispatch({
      type: ActionType.ADD_TODO,
      id: initialIndexTodo,
      text: textValue,
    });
    setInitialIndexTodo(initialIndexTodo + 1);
    setTextValue("");
  };

  const handleToggleTodo = (index: number) => {
    storeTodo.dispatch({ type: ActionType.TOGGLE_TODO, id: index });
  };

  useEffect(() => {
    setInitialIndexTodo(todos.length);
  }, [todos]);

  return (
    <div>
      <input
        ref={inputRef}
        placeholder="Please enter a new Todo"
        type="text"
        value={textValue}
        onChange={handleTextInputChange}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      {/* <ul>
        {getVisibleTodos(todos, visibilityFilter)?.map((todo) => (
          <Todo key={todo.id} onClick={() => handleToggleTodo(todo.id)} />
        ))}
      </ul> */}
      <TodoList
        todos={todos}
        visibilityFilter={visibilityFilter}
        onTodoElementClick={(id: number) => handleToggleTodo(id)}
      />
      <div>
        Show:{" "}
        <FilterLink
          filter={Visibility.SHOW_ALL}
          currentFilter={visibilityFilter}
        >
          All
        </FilterLink>{" "}
        <FilterLink
          filter={Visibility.SHOW_COMPLETED}
          currentFilter={visibilityFilter}
        >
          Complete
        </FilterLink>{" "}
        <FilterLink
          filter={Visibility.SHOW_UNCOMPLETED}
          currentFilter={visibilityFilter}
        >
          Uncompleted
        </FilterLink>{" "}
      </div>
    </div>
  );
};

export default TodoApp;
