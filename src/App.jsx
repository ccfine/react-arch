import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { Title } from "component/title/Title.jsx"

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      hasError: false
    }
  }

  componentDidCatch (err, info) {
    this.setState({
      hasError: true
    })
  }

  render () {
    return this.state.hasError? (
      <div>
        <Title title="出错啦！！！" />
        <span>出错啦！！！</span>
      </div>
    ): (
      <div>
        <div>这是一个react项目架构</div>
        <Switch>
        </Switch>
      </div>
    )
  }
}