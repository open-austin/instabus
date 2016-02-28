import React from 'react';
import {render} from 'react-dom';

import Root from 'js/containers/Root';
import configureStore from 'js/store/configureStore';
import {getRoutes} from 'js/actions/data';

const store = configureStore();
window.store = store;

render(
  <Root store={store} />,
  document.querySelector('#app')
);

// store.dispatch(actions.ui.getUserLatLng());
store.dispatch(getRoutes());

// store.dispatch(actions.data.getStopsForLocation(userLatLng));
// store.dispatch(actions.ui.setRoute('Hillsborough Area Regional Transit_6'));
