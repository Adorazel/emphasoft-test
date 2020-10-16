import {Component} from "react"
import {connect} from "react-redux"
import {setToken} from "../actions"

class Storage extends Component {

  componentDidMount() {
    try {
      const localToken = localStorage.getItem("API_TOKEN")
      if (localToken) {
        const {setToken} = this.props
        setToken(localToken)
      }
    } catch (e) {
      process.env.NODE_ENV === "development" && console.log(e)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.token !== this.props.token) {
      try {
        if (this.props.token) {
          localStorage.setItem("API_TOKEN", this.props.token)
        } else {
          localStorage.removeItem("API_TOKEN")
        }
      } catch (e) {
        process.env.NODE_ENV === "development" && console.log(e)
      }
    }
  }

  render() {
    return this.props.children
  }
}

const mapStateToProps = ({auth: {token}}) => ({token})

const mapDispatchToProps = {setToken}

export default connect(mapStateToProps, mapDispatchToProps)(Storage)