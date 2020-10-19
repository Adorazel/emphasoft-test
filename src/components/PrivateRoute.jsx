import React from "react"
import {connect} from "react-redux"
import {Route, Redirect} from "react-router-dom"


const PrivateRoute = props => {
  const {children, token, redirectTo = "/", ...otherProps} = props
  return <Route {...otherProps}>{!!token ? children : <Redirect to={redirectTo}/>}</Route>
}

const mapStateToProps = ({auth: {token}}) => ({token})

export default connect(mapStateToProps)(PrivateRoute)