import React, { Component, PropTypes } from 'react';
import { GlobalHistory } from 'libs/routing';

import styles from './styles.scss';


export default class TabBarItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    icon: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.showTab = () => GlobalHistory.push(`/${this.props.name}`);
  }

  renderIcon = () => {
    const Icon = this.props.icon;

    if (this.props.active) {
      return (
        <Icon color="#157AFC" style={styles.icon} />
      );
    }

    return (
      <Icon color="#e2e2e2" style={styles.icon} />
    );
  }

  render() {
    return (
      <div onClick={this.showTab} className={this.props.active ? styles.active : styles.item}>
        <div className={styles.iconWrap}>
          { this.renderIcon() }
        </div>
        <div className={styles.label}>{this.props.text}</div>
      </div>
    );
  }
}
