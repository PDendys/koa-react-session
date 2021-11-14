import { createStore, combineReducers } from 'redux';
import { sessionReducer, sessionService } from 'redux-react-session';

const reducers = {
  session: sessionReducer,
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);

sessionService.initSessionService(store);

export default store;
