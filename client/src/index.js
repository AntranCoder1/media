import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles/index.scss";
import { Provider } from 'react-redux';
import rootRedux from './redux/index';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getUser } from './redux/actions/User.actions';

const store = createStore(
  rootRedux,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUser());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
