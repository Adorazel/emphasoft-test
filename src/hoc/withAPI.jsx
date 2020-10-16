import React from "react"
import {ApiServiceConsumer} from "../contexts"

const withAPI = () => Wrapped => {
  return props => <ApiServiceConsumer>{service => <Wrapped {...props} apiService={service}/>}</ApiServiceConsumer>
}

export default withAPI