import React, {Component} from "react"
import {connect} from "react-redux"
import {App} from "../components"

class AppContainer extends Component {


  render() {
    return <App isAuth={!!this.props.token}/>
  }
}

const mapStateToProps = ({auth: {token}}) => ({token})

export default connect(mapStateToProps)(AppContainer)