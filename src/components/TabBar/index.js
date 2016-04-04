import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  ROUTE_LIST_TAB,
  NEARBY_TAB,
} from 'constants/TabNames';

import TabBarItem from 'components/TabBar/TabBarItem';


const TabBar = ({ currentTab }) => (
  <div>
    <TabBarItem
      name={ROUTE_LIST_TAB.name}
      text={ROUTE_LIST_TAB.text}
      active={ROUTE_LIST_TAB.name === currentTab}
    />
    <TabBarItem
      name={NEARBY_TAB.name}
      text={NEARBY_TAB.text}
      active={NEARBY_TAB.name === currentTab}
    />
  </div>
);

TabBar.propTypes = {
  currentTab: PropTypes.string.isRequired,
};

export default connect((state) => ({
  currentTab: state.routing.tab,
}))(TabBar);
