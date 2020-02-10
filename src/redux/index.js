import { createStore, combineReducers } from 'redux';
import app from './app.module';
import epic from './epic.module';

const rootReducer = combineReducers({
  app,
  epic
});

const store = createStore(rootReducer);

export default store;
