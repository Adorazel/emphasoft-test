import React from "react"
import {connect} from "react-redux"
import {Route, Redirect} from "react-router-dom"

const PublicRoute = props => {
  const {children, token, restricted, redirectTo = "/users", ...otherProps} = props
  return <Route {...otherProps}>{!!token && restricted ? <Redirect to={redirectTo}/> : children}</Route>
}

const mapStateToProps = ({auth: {token}}) => ({token})

export default connect(mapStateToProps)(PublicRoute)