import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from 'components/App';
import DevTools from 'redux/DevTools';
import configureStore from 'redux/configureStore';

const store = window.store = configureStore();

import Promise from 'bluebird';

Promise.config({
  longStackTraces: true,
  warnings: true,
});

render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
