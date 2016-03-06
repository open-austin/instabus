import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './ZoomControl.scss'

@CSSModules(styles)
export default class ZoomControl extends React.Component {
  render() {
    return (
      <div styleName='wrap'/>
    )
  }
}