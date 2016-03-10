import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import DevTools from './DevTools';
import rootReducer from 'app/reducers.js';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  applyMiddleware(createLogger()),
  DevTools.instrument()
)(createStore);

export default function configureStore() {
  const INITIAL_STATE = {};
  const store = finalCreateStore(rootReducer, INITIAL_STATE);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../app/reducers', () => {
      const nextRootReducer = require('../app/reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
