import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from 'app/App';
import DevTools from 'redux/DevTools';
import configureStore from 'redux/configureStore';

const store = configureStore();


render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);
