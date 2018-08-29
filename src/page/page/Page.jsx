import React, { Component } from "react"
import styles from "./page.css"

export default class Page extends Component {
  render () {
    return (
      <div className={ styles.page }>
        页面组件
      </div>
    )
  }
}