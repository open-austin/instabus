import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {
  SAVED_PATH,
} from 'constants/Paths';

import { setSavedModal } from 'actions/ui';
import { GlobalHistory, Router } from 'libs/routing';

import styles from './styles.scss';

class SavedButton extends Component {
  static propTypes = {
    route: PropTypes.object,
    modal: PropTypes.bool,
    setSavedModal: PropTypes.func,
  }

  _toggle = () => {
    if (this.props.route.name === SAVED_PATH) {
      this.props.setSavedModal(!this.props.modal);
    }
    else {
      this.props.setSavedModal(true);
      GlobalHistory.push(Router.generate(SAVED_PATH));
    }
  }

  render() {
    const { name } = this.props.route;
    const btn = classNames(styles.btn, {
      [`${styles.active}`]: name === SAVED_PATH,
      [`${styles.minimized}`]: !this.props.modal,
    });
    return (
      <div
        className={btn}
        onClick={this._toggle}
      >
        Saved
      </div>
    );
  }
}

const mapDispatchToProps = {
  setSavedModal,
};

const mapStateToProps = (state) => ({
  route: state.ui.route,
  modal: state.ui.modal.savedRoutes,
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedButton);
