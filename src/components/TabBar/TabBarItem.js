import React, { Component, PropTypes } from 'react';
import { GlobalHistory } from 'libs/routing';

import styles from './styles.scss';


export default class TabBarItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.showTab = () => GlobalHistory.push(`/${this.props.name}`);
  }

  render() {
    return <div onClick={this.showTab} className={this.props.active ? styles.active : styles.item}>{this.props.text}</div>;
  }
}
