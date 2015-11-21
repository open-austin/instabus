import 'babel-core/polyfill';
import React from 'react';
import {render} from 'react-dom';

import Root from './containers/Root';
import configureStore from './redux/configureStore';

const store = configureStore();
window.store = store;

render(
    <Root store={store} />,
    document.querySelector('#app')
);
