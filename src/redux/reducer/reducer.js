import { ACTION_TYPE } from "action/action.js"

const initState = {

}

export const reducer = (state=initState, action) => {
  switch (action.type) {
    case ACTION_TYPE:
      return { ...state }
    default:
      return state
  }
}