import {
  USERS_FETCH_LOADING,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_FAILURE, SET_FILTERED_USERS
} from "../actionTypes"

const sorter = (a, b) => a.id === b.id ? 0 : a.id < b.id ? -1 : 1


const initialState = {
  isLoading: false,
  items: [],
  filteredItems: [],
  error: null
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_FILTERED_USERS:
      return {
        ...state,
        filteredItems: action.payload.sort(sorter),
      }

    case USERS_FETCH_LOADING:
      return {
        ...state,
        isLoading: true,
      }

    case USERS_FETCH_SUCCESS:
      return {
        ...state,
        items: action.payload.sort(sorter),
        isLoading: false,
      }

    case USERS_FETCH_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    default:
      return state
  }

}

export default usersReducer