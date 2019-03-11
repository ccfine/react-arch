import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import reducer from "./redux/reducer.js"
import "css/global.css"

let store

if (process.env.NODE_ENV === "development") {
  store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension? window.devToolsExtension(): f => f
  ))
} else if (process.env.NODE_ENV === "production") {
  store = createStore(reducer, applyMiddleware(thunk))
}

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root")
)