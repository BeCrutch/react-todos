import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux'
import thunk from "redux-thunk"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {rootReducer} from "./redux/rootReducer";

const middleware = [thunk];

const store = createStore(rootReducer, compose(
  applyMiddleware(
    ...middleware
  )
  //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
