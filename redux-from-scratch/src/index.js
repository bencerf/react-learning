import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store';
import Counter from './redux/Counter';
import reportWebVitals from './reportWebVitals';

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      {/* <App /> */}
      <Counter
        storeValue={store.getState()}
        onIncrement={() => store.dispatch({type: 'INCREMENT'})}
        onDecrement={() => store.dispatch({type: 'DECREMENT'})}
      />
    </React.StrictMode>,
    document.getElementById('root')
  )
};

store.subscribe(render);
render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
