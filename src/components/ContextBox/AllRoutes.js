import React from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'

@observer
export default class AllRoutes extends React.Component {
  componentDidMount() {
    if (!this.props.data.routes.length) {
      this.props.data.loadAllRoutes()
    }
    this.props.data.clearStops()
  }

  render() {
    return (
      <div>
        {this.props.data.routes.map(route => {
          const { shortName, longName } = route
          const url = `#/route/${shortName}`
          return (
            <a href={url} key={shortName}>
              <div>{shortName} {longName}</div>
            </a>
          )
        })}
      </div>
    )
  }
}