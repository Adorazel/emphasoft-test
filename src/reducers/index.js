import {combineReducers} from "redux"
import authReducer from "./auth.reducer"
import usersReducer from "./users.reducer"
import userReducer from "./user.reducer"


export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  user: userReducer
})