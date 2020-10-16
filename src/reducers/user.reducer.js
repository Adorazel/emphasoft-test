import {
  USER_FETCH_LOADING,
  USER_FETCH_FAILURE,
  USER_FETCH_SUCCESS,
  USER_CLEAR
} from "../actionTypes"

const userInitialState = {
  username: "",
  first_name: "",
  last_name: "",
  password:  "",
  is_active: false,
  last_login: Date.now(),
  is_superuser: false,
}


const initialState = {
  isLoading: false,
  value: userInitialState,
  error: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case USER_CLEAR:
      return {
        ...state,
        value: userInitialState,
      }

    case USER_FETCH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      }

    case USER_FETCH_SUCCESS:
      return {
        ...state,
        value: action.payload,
        isLoading: false,
      }

    case USER_FETCH_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    default:
      return state
  }

}

export default userReducer