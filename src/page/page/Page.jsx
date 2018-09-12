import React, { Component } from "react"
import { Title } from "component/title/Title.jsx"
import styles from "./page.css"

export default class Page extends Component {
  render () {
    return (
      <div className={ styles.page }>
        <Title title="页面" />
        页面组件
      </div>
    )
  }
}