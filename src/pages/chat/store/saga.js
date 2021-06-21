import { call, put, takeEvery } from "redux-saga/effects"
import io from 'socket.io-client'
// Login Redux States
import {
  GET_USER_PROFILE,
  GET_CHAT_CONTACTS,
  SELECT_CHAT,
  SEND_MSG,
  GET_PREVIOUS_MESSAGES,
  ADD_PARTICIPANTS,
  MESSAGE_SEEN,
  MESSAGE_DELIVERED,
  SOCKET_AUTHORIZED,
} from "./actionTypes"

import { apiError, createChatSocketFailure, createChatSocketSuccess, getChatContactsSuccess, } from "./actions"

//Include Both Helper File with needed methods
import { getChatContactsRequest } from "../../../helpers/backend-helpers"

function* getChatContacts({ payload: { userId } }) {
  try {
    const response = yield call(getChatContactsRequest, userId);
    if (response) {
      yield put(getChatContactsSuccess(response))
      return;
    }
    throw "Unknown response received from Server";


  } catch (error) {
    yield put(apiError(error))
  }
}



function* chatSaga() {
  yield takeEvery(GET_CHAT_CONTACTS, getChatContacts)
}

export default chatSaga
