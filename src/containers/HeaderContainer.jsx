import React, {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {logout, filterUsers} from "../actions"
import {Header} from "../components"
import {compose} from "../utils"


class HeaderContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      search: ""
    }
  }

  doFilter = () => {
    const {users, filterUsers} = this.props
    const {search} = this.state
    const pattern = RegExp(search, "gi")
    const filteredUsers = users.filter(user => pattern.test(user.username))
    filterUsers(filteredUsers)
  }

  changeHandler = event => {
    const {name, value} = event.target
    this.setState(state => ({
      ...state,
      [name]: value
    }), () => {
      this.doFilter()
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.doFilter()
  }

  doLogout = () => {
    const {logout} = this.props
    logout()
  }

  render() {
    const {doLogout, changeHandler} = this
    const {search} = this.state
    const {location, backBtnRef} = this.props
    const headerProps = {search, doLogout, changeHandler, location, backBtnRef}
    return <Header {...headerProps}/>
  }

}

const mapStateToProps = ({users: {items: users}}) => ({users})

const mapDispatchToProps = {logout, filterUsers}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(HeaderContainer)