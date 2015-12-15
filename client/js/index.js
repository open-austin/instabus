import 'babel-core/polyfill';
import React from 'react';
import {render} from 'react-dom';
import Immutable from 'immutable';

import Root from './containers/Root';
import configureStore from './redux/configureStore';
import * as actions from './redux';

window.actions = actions;
window.Immutable = Immutable;

const store = configureStore();
window.store = store;

render(
  <Root store={store} />,
  document.querySelector('#app')
);

store.dispatch(actions.ui.getUserLatLng());

// store.dispatch(actions.data.getStopsForLocation(userLatLng));
// store.dispatch(actions.ui.setRoute('Hillsborough Area Regional Transit_6'));
