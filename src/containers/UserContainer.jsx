import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {withRouter} from "react-router-dom"
import {fetchUser, createUser, updateUser} from "../actions"
import {compose, formatDate} from "../utils"
import {withAPI} from "../hoc"
import {User} from "../components"


class UserContainer extends Component {

  constructor(props) {
    super(props)

    const {location} = this.props
    this.isCreate = location.pathname.split("/")[2] === "create"
    this.userId = null

    if (!this.isCreate) {
      this.userId = parseInt(location.pathname.split("/")[3])
    }

    this.state = {
      id: {value: "", isValid: true, isReadOnly: true, isRequired: false},
      username: {
        value: "",
        isValid: true,
        isReadOnly: false,
        isRequired: true,
        pattern: /^[\w.@+-]+$/,
        minLength: 1,
        maxLength: 150,
        errorMessage: "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
      },
      first_name: {
        value: "",
        isValid: true,
        isReadOnly: false,
        isRequired: false,
        maxLength: 30,
        errorMessage: "30 characters or fewer."
      },
      last_name: {
        value: "",
        isValid: true,
        isReadOnly: false,
        isRequired: false,
        maxLength: 150,
        errorMessage: "150 characters or fewer."
      },
      password: {
        value: "",
        isValid: true,
        isReadOnly: false,
        isRequired: true,
        pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
        minLength: 1,
        maxLength: 128,
        errorMessage: "Required. 128 characters or fewer. Minimum length 8. Required at least 1 digit and at least 1 capital letter."
      },
      is_active: {value: false, isValid: true, isReadOnly: false, isRequired: true},
      last_login: {value: formatDate(Date.now()), isValid: true, isReadOnly: true, isRequired: false},
      is_superuser: {value: false, isValid: true, isReadOnly: true, isRequired: false},
    }
  }

  changeHandler = event => {
    const {name: key, value: rawValue} = event.target
    const value = rawValue.trim()
    const user = this.state
    let isValid = true

    if (user[key].pattern) {
      isValid = isValid && user[key].pattern.test(value)
    }

    if (user[key].minLength) {
      isValid = isValid && user[key].minLength <= value.length
    }

    if (user[key].maxLength) {
      isValid = isValid && user[key].maxLength >= value.length
    }

    this.setState(state => ({
      ...state,
      [key]: {
        ...state[key],
        value,
        isValid
      }
    }))
  }

  doMapping = () => {
    const {user} = this.props
    const newState = {}
    for (let key in user) {
      if (user.hasOwnProperty(key)) {
        let value = user[key]
        if (key === "last_login") {
          value = new Date(value).getTime()
          value = formatDate(value)
        }
        newState[key] = {
          ...this.state[key],
          value,
        }
      }
    }

    this.setState(state => ({
      ...state,
      ...newState
    }))
  }

  doSubmit = () => {
    const user = this.state
    let formIsValid = true
    for (let key in user) {
      if (user.hasOwnProperty(key)) {
        let isValid = user[key].isValid
        if (user[key].pattern) {
          isValid = isValid && user[key].pattern.test(user[key].value)
        }
        if (user[key].minLength) {
          isValid = isValid && user[key].minLength <= user[key].value.length
        }
        if (user[key].maxLength) {
          isValid = isValid && user[key].maxLength >= user[key].value.length
        }
        formIsValid = formIsValid && isValid
        user[key].isValid = isValid
      }
    }

    this.setState(state => ({
      ...state,
      ...user
    }))

    if (formIsValid) {
      const rawUser = this.state
      const user = {}
      for (let key in rawUser) {
        if (rawUser.hasOwnProperty(key)) {
          if (!rawUser[key].isReadOnly) {
            user[key] = rawUser[key].value
          }
        }
      }

      if (this.isCreate) {
        const {backBtnRef, createUser, token} = this.props
        createUser({
          token, user, cb: () => {
            backBtnRef.current.click()
          }
        })
      } else {
        const {backBtnRef, updateUser, token} = this.props
        updateUser({
          id: this.state.id.value, token, user, cb: () => {
            backBtnRef.current.click()
          }
        })
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.user !== this.props.user) {
      this.doMapping()
    }
  }

  componentDidMount() {
    if (this.userId) {
      const {fetchUser, token} = this.props
      fetchUser({token, id: this.userId})
    }
  }


  render() {
    const {isLoading, error} = this.props
    const user = this.state
    const {changeHandler, isCreate, doSubmit} = this
    const userProps = {user, isLoading, error, changeHandler, isCreate, doSubmit}
    return <User {...userProps}/>
  }
}

const mapStateToProps = ({auth: {token}, user: {value: user, isLoading, error}}) => ({token, user, isLoading, error})

const mapDispatchToProps = (dispatch, {apiService}) => bindActionCreators({
  fetchUser: fetchUser(apiService),
  createUser: createUser(apiService),
  updateUser: updateUser(apiService)
}, dispatch)

export default compose(
  withAPI(),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(UserContainer)