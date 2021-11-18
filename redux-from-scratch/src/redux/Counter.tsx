import { deepFreeze } from "./helpers";
import { arrayEquals } from "./helpers";

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

  console.log(arrayEquals(addCounter(listBefore), listAfter));
  // expect(addCounter(listBefore)).toEqual(listAfter);
};

const testRemoveCounter = () => {
  console.log("testRemoveCounter");
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  console.log(arrayEquals(removeCounter(listBefore, 1), listAfter));
};

const testIncrementCounter = () => {
  console.log("testIncrementCounter");
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore);

  console.log(arrayEquals(incrementCounter(listBefore, 1), listAfter));
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log("All tests passed.");

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
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  );
};

export default Counter;
