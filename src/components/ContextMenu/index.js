import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';
import { iOS } from 'libs/mobile';

import styles from './styles.scss';

export default class ContextMenu extends Component {
  static propTypes = {
    children: PropTypes.any,
  };

  state = {
    pressed: false,
  }

  componentDidMount() {
    if (iOS) {
      this.resizeTimeout = null;
      this.scrollTimeout = null;
      this.refs.context.addEventListener('scroll', this.onScroll);
      this.refs.context.addEventListener('resize', this.onResize);
      this.clientHeight = this.refs.context.clientHeight;
      this.scrollHeight = this.refs.context.scrollHeight;
      if (this.refs.context.scrollTop <= 0) {
        this.refs.context.scrollTop = 1;
      }
    }
  }

  componentDidUpdate() {
    if (iOS && this.refs.context.scrollTop <= 0) {
      this.clientHeight = this.refs.context.clientHeight;
      this.scrollHeight = this.refs.context.scrollHeight;
      this.refs.context.scrollTop = 1;
    }
  }

  componentWillUnmount() {
    if (iOS) {
      this.refs.context.removeEventListener('scroll', this.onScroll);
      this.refs.context.removeEventListener('resize', this.onResize);
    }
  }

  onPress = () => {
    this.setState({
      pressed: true,
    });
  }

  onScroll = () => {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(this.adjustScrollTop, 100);
  }

  onResize = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(this.updateDimensions, 100);
  }

  offPress = () => {
    this.setState({
      pressed: false,
    });
  }

  adjustScrollTop = () => {
    if (this.state.pressed) return;
    const scrollTop = this.refs.context.scrollTop;
    if (scrollTop <= 0) {
      this.refs.context.scrollTop = 1;
    }
    else if ((this.scrollHeight - scrollTop) <= this.clientHeight) {
      this.refs.context.scrollTop = scrollTop - 1;
    }
  }

  updateDimensions = () => {
    this.clientHeight = this.refs.context.clientHeight;
    this.scrollHeight = this.refs.context.scrollHeight;
  }

  render() {
    const contextStyle = classNames(styles.context, {
      [`${styles.iOS}`]: iOS,
    });
    return (
      <div
        onTouchStart={this.onPress}
        onTouchEnd={this.offPress}
        className={contextStyle}
        ref="context"
      >
        {this.props.children}
      </div>
    );
  }
}
