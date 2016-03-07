import React from 'react';
import CSSModules from 'react-css-modules';
import styles from 'styles/base.scss';
import MapLayer from 'components/MapLayer';
import TopBar from 'components/TopBar';
import ContextBox from 'components/ContextBox';
import ZoomControl from 'components/ZoomControl';
import BusCheckInKey from 'components/BusCheckInKey';

import UiStore from 'stores/UiStore';
import DataStore from 'stores/DataStore';

@CSSModules(styles)
export default class Root extends React.Component {
  render() {
    return (
      <div styleName="container">
        <MapLayer ui={UiStore} data={DataStore} />
        <TopBar />
        <ContextBox ui={UiStore} data={DataStore} />
        <ZoomControl />
        <BusCheckInKey />
      </div>
    );
  }
}
