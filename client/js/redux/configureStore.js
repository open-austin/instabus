import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import Immutable from 'immutable';

import DevTools from '../containers/DevTools';
import rootReducer from './index';

const INITIAL_STATE = Immutable.Map();

const finalCreateStore = compose(
  applyMiddleware(thunk),
  applyMiddleware(createLogger({
    transformer: state => state.toJS(),
  })),
  DevTools.instrument()
)(createStore);

export default function configureStore() {
  const store = finalCreateStore(rootReducer, INITIAL_STATE);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./index', () => {
      const nextRootReducer = require('./index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
