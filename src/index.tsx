import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, compose } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import { Provider } from 'react-redux';
import axios from 'axios';

import App from './App';

const reducer = combineReducers({
  session: sessionReducer,
});

const enhancers = compose(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const store = createStore(reducer, undefined, enhancers);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const validateSession = async (session) => {
  // check if your session is still valid
  const { status, data } = await axios.get<{ isValid: boolean }>('http://localhost:3000/auth/check-session', { withCredentials: true });
  if (status) {
    return data.isValid;
  }
};

const options = {
  refreshOnCheckAuth: true,
  redirectPath: '/home',
  driver: 'COOKIES',
  validateSession,
};

// Init the session service
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
sessionService.initSessionService(store, options)
  .then(() => console.log('Session is ready and a session was refreshed from your storage'))
  .catch(() => console.log('Session is ready and there is no session in your storage'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
