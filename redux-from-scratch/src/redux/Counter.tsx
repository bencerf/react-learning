import { deepFreeze } from "./helpers";
import { arrayEquals } from "./helpers";
import { storeTodo } from "./store";

const addCounter = (list: number[]) => {
  // Mutable array
  // list.push(0);
  return [...list, 0];
};

const removeCounter = (list: number[], index: number) => {
  // Mutable array
  // list.splice(index, 1);
  // return list.slice(0, index).concat(list.slice(index + 1));
  return [...list.slice(0, index), ...list.slice(index + 1)];
};

const incrementCounter = (list: number[], index: number) => {
  // Mutable array
  // list[index]++;
  // return list;
  return [...list.slice(0, index), list[index] + 1, ...list.slice(index + 1)];
};

const testAddCounter = () => {
  console.log("testAddCounter");
  const listBefore: number[] = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  // expect(addCounter(listBefore)).toEqual(listAfter);
  return arrayEquals(addCounter(listBefore), listAfter);
};

const testRemoveCounter = () => {
  console.log("testRemoveCounter");
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  return arrayEquals(removeCounter(listBefore, 1), listAfter);
};

const testIncrementCounter = () => {
  console.log("testIncrementCounter");
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore);

  return arrayEquals(incrementCounter(listBefore, 1), listAfter);
};

testAddCounter() && testRemoveCounter() && testIncrementCounter()
  ? console.log("# All tests Counter passed !!")
  : console.log("# Tests Counter failed !!");

interface CounterProps {
  storeValue: any;
  onIncrement: React.MouseEventHandler<HTMLButtonElement>;
  onDecrement: React.MouseEventHandler<HTMLButtonElement>;
}

const Counter = ({
  storeValue,
  onIncrement,
  onDecrement,
}: CounterProps): any => {
  return (
    <div>
      <h1>{storeValue}</h1>
      {console.log(storeValue)}
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  );
};

export default Counter;
