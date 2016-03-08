import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from 'app/App';
import DevTools from 'redux/DevTools';

ReactDOM.render(
  <Provider store={this.props.store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
