import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {fetchUsers, deleteUser, clearUser, changeUserStatus} from "../actions"
import {compose} from "../utils"
import {withAPI} from "../hoc"
import {List} from "../components"


class ListContainer extends Component {

  doDelete = id => {
    const {deleteUser, token} = this.props
    deleteUser({token, id})
  }

  changeStatus = (id, is_active) => {
    const {changeUserStatus, token} = this.props
    changeUserStatus({token, id, is_active})
  }

  componentDidMount() {
    const {fetchUsers, clearUser, token} = this.props
    clearUser()
    fetchUsers(token)
  }

  render() {
    const {doDelete, changeStatus} = this
    const {isLoading, error, users} = this.props
    const listProps = {isLoading, error, users, doDelete, changeStatus}
    return <List {...listProps}/>
  }
}

const mapStateToProps = (
  {
    users: {isLoading, error, filteredItems: users},
    auth: {token}
  }) => ({isLoading, error, users, token})

const mapDispatchToProps = (dispatch, {apiService}) => bindActionCreators({
  fetchUsers: fetchUsers(apiService),
  deleteUser: deleteUser(apiService),
  changeUserStatus: changeUserStatus(apiService),
  clearUser
}, dispatch)

export default compose(
  withAPI(),
  connect(mapStateToProps, mapDispatchToProps)
)(ListContainer)