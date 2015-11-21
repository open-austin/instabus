import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class Lol extends Component {
    render() {
        return (
            <div>
                <div>Hi</div>
                {this.props.tab}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tab: state.ui.tab,
    }
}

export default connect(mapStateToProps)(Lol);
