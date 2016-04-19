import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {
  FAVORITES,
} from 'constants';

import { setFavoritesModal } from 'actions/ui';
import { GlobalHistory, Router } from 'libs/routing';

import styles from './styles.scss';

class FavoritesButton extends Component {
  static propTypes = {
    route: PropTypes.object,
    modal: PropTypes.bool,
    setFavoritesModal: PropTypes.func,
  }

  _toggle = () => {
    if (this.props.route.name === FAVORITES) {
      this.props.setFavoritesModal(!this.props.modal);
    }
    else {
      this.props.setFavoritesModal(true);
      GlobalHistory.push(Router.generate(FAVORITES));
    }
  }

  render() {
    const { name } = this.props.route;
    const btn = classNames(styles.btn, {
      [`${styles.active}`]: name === FAVORITES,
      [`${styles.minimized}`]: !this.props.modal,
    });
    return (
      <div
        className={btn}
        onClick={this._toggle}
      >
        Favorites
      </div>
    );
  }
}

const mapDispatchToProps = {
  setFavoritesModal,
};

const mapStateToProps = (state) => ({
  route: state.ui.route,
  modal: state.ui.modal.favorites,
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesButton);
