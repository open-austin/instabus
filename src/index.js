import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import DevTools from 'redux/DevTools';
import configureStore from 'redux/configureStore';

import App from 'components/App';
import RouteList from 'components/RouteList';
import StopList from 'components/StopList';
import Nearby from 'components/Nearby';


const { store, history } = configureStore();
window.store = store;

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="route" component={RouteList} />
          <Route path="route/:id" component={StopList} />
          <Route path="nearby" component={Nearby} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
