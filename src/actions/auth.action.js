import {AUTH_FETCH_FAILURE, AUTH_FETCH_LOADING, AUTH_FETCH_SUCCESS, SET_TOKEN} from "../actionTypes"


const setToken = token => dispatch => {
  dispatch({
    type: SET_TOKEN,
    payload: token
  })
}

const signIn = apiService => ({username, password}) => dispatch => {
  dispatch(AUTH_FETCH_LOADING)
  apiService.auth({
    username,
    password
  }).then(json => {
    dispatch({
      type: AUTH_FETCH_SUCCESS,
      payload: json.token
    })
  }).catch(error => {
    dispatch({
      type: AUTH_FETCH_FAILURE,
      payload: error
    })
  })
}

const logout = () => dispatch => {
  dispatch({
    type: SET_TOKEN,
    payload: null
  })
}

export {
  setToken,
  signIn,
  logout
}