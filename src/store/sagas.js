import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./../pages/auth/login/store/saga"
import ChatSaga from "./../pages/chat/store/saga"
import MeetingsSaga from "./../pages/meetings/store/saga"
import StudentsSaga from "./../pages/students/store/saga"
import TestsSaga from "./../pages/tests/store/saga"

export default function* rootSaga() {
  yield all([
    AccountSaga(),
    AuthSaga(),
    ChatSaga(),
    MeetingsSaga(),
    StudentsSaga(),
    TestsSaga()
  ])
}
