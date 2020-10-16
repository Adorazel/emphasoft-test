import React, {Component, createRef} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {compose} from "../utils"
import {withAPI} from "../hoc"
import {signIn} from "../actions"
import {Auth} from "../components"

class AuthContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: {value: "", isValid: true},
      password: {value: "", isValid: true}
    }

    this.usernameRef = createRef()
  }

  changeHandler = event => {

    const {name, value} = event.target
    let isValid = false
    if (value.trim()) isValid = true
    this.setState(state => {
      return {
        ...state,
        [name]: {value, isValid}
      }
    })
  }

  doLogin = () => {
    const {username, password} = this.state
    const {signIn} = this.props

    let usernameIsValid = false
    if (username.value.trim()) usernameIsValid = true

    let passwordIsValid = false
    if (password.value.trim()) passwordIsValid = true

    this.setState(state => ({
      ...state,
      username: {
        ...state.username,
        isValid: usernameIsValid
      },
      password: {
        ...state.password,
        isValid: passwordIsValid
      }
    }), () => {
      const {username, password} = this.state
      if (username.isValid && password.isValid) {
        signIn({
          username: username.value.trim(),
          password: password.value.trim()
        })
      }
    })


  }

  keydownListener = event => {
    if (event.key === "Enter") this.doLogin()
  }

  componentDidMount() {
    this.usernameRef.current.focus()
    document.addEventListener("keydown", this.keydownListener)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownListener)
  }

  render() {

    const {username, password} = this.state
    const {isLoading, error} = this.props
    const {changeHandler, doLogin, usernameRef} = this

    const AuthProps = {username, usernameRef, password, isLoading, error, changeHandler, doLogin}

    return <Auth {...AuthProps}/>
  }
}


const mapStateToProps = ({auth: {isLoading, error}}) => ({isLoading, error})

const mapDispatchToProps = (dispatch, {apiService}) => bindActionCreators({
  signIn: signIn(apiService),
}, dispatch)

export default compose(
  withAPI(),
  connect(mapStateToProps, mapDispatchToProps)
)(AuthContainer)