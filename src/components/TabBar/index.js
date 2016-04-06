import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  saved,
  recent,
  routes,
  legend,
  nearby,
} from 'glyphs';

import styles from './styles.scss';

import {
  ROUTE_LIST_TAB,
  NEARBY_TAB,
  SAVED_TAB,
  RECENT_TAB,
  LEGEND_TAB,
} from 'constants/TabNames';

import TabBarItem from 'components/TabBar/TabBarItem';


const TabBar = ({ currentTab }) => (
  <div className={styles.nav}>
    <TabBarItem
      icon={saved}
      name={SAVED_TAB.name}
      text={SAVED_TAB.text}
      active={SAVED_TAB.name === currentTab}
    />
    <TabBarItem
      icon={routes}
      name={ROUTE_LIST_TAB.name}
      text={ROUTE_LIST_TAB.text}
      active={ROUTE_LIST_TAB.name === currentTab}
    />
    <TabBarItem
      icon={nearby}
      name={NEARBY_TAB.name}
      text={NEARBY_TAB.text}
      active={NEARBY_TAB.name === currentTab}
    />
    <TabBarItem
      icon={recent}
      name={RECENT_TAB.name}
      text={RECENT_TAB.text}
      active={RECENT_TAB.name === currentTab}
    />
    <TabBarItem
      icon={legend}
      name={LEGEND_TAB.name}
      text={LEGEND_TAB.text}
      active={LEGEND_TAB.name === currentTab}
    />
  </div>
);

TabBar.propTypes = {
  currentTab: PropTypes.string,
};

export default connect((state) => ({
  currentTab: state.routing.tab,
}))(TabBar);
