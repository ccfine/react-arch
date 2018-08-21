import React, { Component } from "react"
import styles from "./container.css"

export default class Container extends Component {
  render () {
    return (
      <div className={ styles.container }>
        业务组件，与redux有关，不可复用
      </div>
    )
  }
}