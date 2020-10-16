import {
  SET_FILTERED_USERS,
  USERS_FETCH_FAILURE,
  USERS_FETCH_LOADING,
  USERS_FETCH_SUCCESS
} from "../actionTypes"


const fetchUsers = apiService => token => dispatch => {
  dispatch(USERS_FETCH_LOADING)
  apiService.getAllUsers({token}).then(json => {
    dispatch({
      type: USERS_FETCH_SUCCESS,
      payload: json
    })
  }).catch(error => {
    dispatch({
      type: USERS_FETCH_FAILURE,
      payload: error
    })
  })
}

const filterUsers = users => dispatch => {
  dispatch({
    type: SET_FILTERED_USERS,
    payload: users
  })
}


export {
  fetchUsers,
  filterUsers,
}