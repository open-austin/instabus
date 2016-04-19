import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import FastClick from 'fastclick';

import DevTools from 'redux/DevTools';
import configureStore from 'redux/configureStore';

import App from 'components/App';

import { setupRouter } from 'actions/routing';

FastClick.attach(document.body);

const store = window.store = configureStore();

setupRouter(store);

const renderDevTools = () => {
  if (process.env.NODE_ENV !== 'production') {
    return <DevTools />;
  }

  return null;
};

render(
  <Provider store={store}>
    <div>
      <App />
      { renderDevTools() }
    </div>
  </Provider>,
  document.getElementById('root')
);
