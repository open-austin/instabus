import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import DevTools from 'redux/DevTools';
import configureStore from 'redux/configureStore';

import { setupRouter } from 'actions/routing';

import App from 'components/App';

const store = window.store = configureStore();

setupRouter(store);

render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
