import {AUTH_FETCH_LOADING, AUTH_FETCH_SUCCESS, AUTH_FETCH_FAILURE, SET_TOKEN} from "../actionTypes"

const initialState = {
  token: null,
  isLoading: false,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_TOKEN: {
      return {
        ...state,
        token: action.payload,
      }
    }

    case AUTH_FETCH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case AUTH_FETCH_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isLoading: false,
      }


    case AUTH_FETCH_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }

    default:
      return state
  }
}

export default authReducer