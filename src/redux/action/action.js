export const ACTION_TYPE = "ACTION_TYPE"

export const actionCreator = () => {
  return { type: ACTION_TYPE }
}

/*
  export const actionCreator = () => (
    { type: ACTION_TYPE }
  )
*/

export const actionCreatorAsync = () => {
  return (dispatch, getState) => {
    dispatch()
  }
}