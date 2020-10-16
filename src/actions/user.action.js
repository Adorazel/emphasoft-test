import {
  USER_CLEAR,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAILURE,
  USER_FETCH_LOADING

} from "../actionTypes"
import notie from "notie"
import {fetchUsers} from "./"


const clearUser = () => dispatch => {
  dispatch(USER_CLEAR)
}

const fetchUser = apiService => ({token, id}) => dispatch => {
  dispatch(USER_FETCH_LOADING)
  apiService.getUser({token, id}).then(json => {
    dispatch({
      type: USER_FETCH_SUCCESS,
      payload: json
    })
  }).catch(error => {
    dispatch({
      type: USER_FETCH_FAILURE,
      payload: error
    })
  })
}

const createUser = apiService => ({user, token, cb}) => dispatch => {
  dispatch(USER_FETCH_LOADING)
  apiService.createUser({user, token}).then(json => {
    dispatch({
      type: USER_FETCH_SUCCESS,
      payload: json
    })
    notie.alert({
      type: "success",
      text: `User ${json.username} was created successfully`
    })
    typeof cb === "function" && cb()
  }).catch(error => {
    dispatch({
      type: USER_FETCH_FAILURE,
      payload: error
    })
  })
}

const updateUser = apiService => ({id, user, token, cb}) => dispatch => {
  dispatch(USER_FETCH_LOADING)
  apiService.updateUser({id, user, token}).then(json => {
    dispatch({
      type: USER_FETCH_SUCCESS,
      payload: json
    })
    notie.alert({
      type: "success",
      text: `User ${json.username} was updated successfully`
    })
    typeof cb === "function" && cb()
  }).catch(error => {
    dispatch({
      type: USER_FETCH_FAILURE,
      payload: error
    })
  })
}

const changeUserStatus = apiService => ({id, is_active, token}) => dispatch => {
  dispatch(USER_FETCH_LOADING)
  apiService.updateUserStatus({id, is_active, token}).then(json => {
    dispatch({
      type: USER_FETCH_SUCCESS,
      payload: json
    })
    notie.alert({
      type: "success",
      text: `Status of user with id ${id} was updated successfully`
    })
    fetchUsers(apiService)(token)(dispatch)
  }).catch(error => {
    dispatch({
      type: USER_FETCH_FAILURE,
      payload: error
    })
  })
}

const deleteUser = apiService => ({token, id}) => dispatch => {
  notie.confirm({
    text: "Are you sure?",
    submitText: "Yes",
    cancelText: "Cancel",
    submitCallback: () => {
      apiService.deleteUser({token, id}).then(({deleted}) => {
        notie.alert({
          type: "success",
          text: `User with id ${id} was deleted successfully`
        })
        fetchUsers(apiService)(token)(dispatch)
      }).catch(error => {
        notie.alert({
          type: "danger",
          text: `User with id ${id} was not deleted`
        })
        process.env.NODE_ENV === "development" && console.log(error)
      })
    }
  })
}


export {
  fetchUser,
  createUser,
  deleteUser,
  clearUser,
  updateUser,
  changeUserStatus
}