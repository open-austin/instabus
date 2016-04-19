import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {
  ALL_ROUTES,
} from 'constants';

import { GlobalHistory, Router } from 'libs/routing';
import { setRoutesModal } from 'actions/ui';

import styles from './styles.scss';

class RoutesButton extends Component {
  static propTypes = {
    route: PropTypes.object,
    modal: PropTypes.bool,
    setRoutesModal: PropTypes.func,
  }

  _toggle = () => {
    if (this.props.route.name === ALL_ROUTES) {
      this.props.setRoutesModal(!this.props.modal);
    }
    else {
      this.props.setRoutesModal(true);
      GlobalHistory.push(Router.generate(ALL_ROUTES, {}));
    }
  }

  render() {
    const { name } = this.props.route;
    const btn = classNames(styles.btn, {
      [`${styles.active}`]: name === ALL_ROUTES,
      [`${styles.minimized}`]: !this.props.modal,
    });
    return (
      <div
        className={btn}
        onClick={this._toggle}
      >
        All Routes
      </div>
    );
  }
}

const mapDispatchToProps = {
  setRoutesModal,
};

const mapStateToProps = (state) => ({
  route: state.ui.route,
  modal: state.ui.modal.routes,
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutesButton);
