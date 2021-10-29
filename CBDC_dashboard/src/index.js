import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {createStore} from 'redux'


const blocknum = 1

function reducer(state=blocknum,action){
  if (action.type ==="add"){
    state++;
    return state
  } else if(action.type ==="reset"){
    state = 0 ;
    return state
  }else{
    return state
  }
}

let store = createStore(reducer)



ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);


