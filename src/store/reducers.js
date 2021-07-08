import { combineReducers } from "redux"

// Authentication
import Login from "./../pages/auth/login/store/reducer"
import Register from "./auth/register/reducer"
import Layout from "./layout/reducer"
import Navbar from "./navbar/reducer"
import Chat from "./../pages/chat/store/reducer"
import Meetings from "./../pages/meetings/store/reducer"
import Students from "./../pages/students/store/reducer"
import Tests from "./../pages/tests/store/reducer"
import Attempts from "./../pages/attempts/store/reducer"

const rootReducer = combineReducers({
  Register,
  Login,
  Layout,
  Navbar,
  Chat,
  Meetings,
  Students,
  Tests,
  Attempts
})

export default rootReducer
