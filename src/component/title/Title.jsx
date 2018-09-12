import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

export const Title = props => {
  return (
    <Helmet>
      <title>{ props.title }</title>
    </Helmet>
  )
}

Title.propTypes = {
  title: PropTypes.string
}
