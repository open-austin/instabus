import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './ContextBox.scss'
import { observer } from 'mobx-react'

import AllRoutes from './AllRoutes'
import RouteDetails from './RouteDetails'

@CSSModules(styles)
@observer
class ContextBox extends React.Component {
  componentDidUpdate(prevProps) {
    console.log(prevProps, this.props)
  }

  _renderRoute = () => {
    switch (this.props.ui.route) {
      case 'route':
        const route = this.props.ui.params
        return (
          <RouteDetails route={route} data={this.props.data}/>
        )
      default:
        return (
          <AllRoutes data={this.props.data}/>
        )
    }
  }

  render() {
    return (
      <div styleName='wrap'>
        { this._renderRoute() }
      </div>
    )
  }
}

export default ContextBox