const Counter = ({ storeValue, onIncrement, onDecrement }) => {
  return (
    <>
      <h1>{storeValue}</h1>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </>
  )
}

export default Counter;