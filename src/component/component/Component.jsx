import React, { Component } from "react"
import styles from "./component.css"

export default class Component extends Component {
  render () {
    return (
      <div className={ styles.component }>
        ui组件，与redux无关，可复用
      </div>
    )
  }
}