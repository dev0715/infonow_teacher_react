import { call, put, takeEvery } from "redux-saga/effects"
// Login Redux States
import {
  GET_CHAT_CONTACTS,
  GET_SELECT_CHAT_DOCUMENTS,
  UPDATE_ABOUT,
  UPLOAD_DOCUMENT,
} from "./actionTypes"

import { v4 } from 'uuid';
import axios from 'axios';

import { addDocumentToQueue, apiError, cancelDocumentUpload, getChatContactsFailure, getChatContactsSuccess, getSelectChatDocumentsFailure, getSelectChatDocumentsSuccess, updateAboutFailure, updateAboutSuccess, updateDocumentProgress, } from "./actions"

//Include Both Helper File with needed methods
import { getChatContactsRequest, getChatDocuments, getLoggedInUser, updateUser, uploadDocument } from "../../../helpers/backend-helpers"

function* getChatContacts({ payload: { userId } }) {
  try {
    const response = yield call(getChatContactsRequest, userId);
    if (response) {
      yield put(getChatContactsSuccess(response))
      return;
    }
    throw "Unknown response received from Server";


  } catch (error) {
    yield put(getChatContactsFailure(error.message ? error.message : error))
  }
}

function* uploadDoc({ payload: { chatId, file, callback } }) {
  try {

    let document = {
      documentId: v4(),
      chatId,
      name: file.name,
      progress: 0,
      request: axios.CancelToken.source(),
    }

    yield put(addDocumentToQueue(document))
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total)
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        callback({ documentId: document.documentId, progress: percent })
      },
      cancelToken: document.request.token
    }

    let formData = new FormData()

    formData.append("chatId", chatId)
    formData.append("file", file)

    const response = yield call(uploadDocument, formData, options);
    if (response) {
      yield put(updateDocumentProgress({ documentId: document.documentId, data: response }))
      return;
    }
    throw "Unknown response received from Server";


  } catch (error) {
    yield put(cancelDocumentUpload({ documentId: document.documentId }))
  }
}

function* getDoc({ payload: { chatId } }) {
  try {
    const response = yield call(getChatDocuments, chatId);
    if (response) {
      yield put(getSelectChatDocumentsSuccess(response))
      return;
    }
    throw "Unknown response received from Server";


  } catch (error) {
    yield put(getSelectChatDocumentsFailure(error.message ? error.message : error))
  }
}

function* updateAbout({ payload: { about } }) {
  try {
    let user = getLoggedInUser()
    user.about = about
    const response = yield call(updateUser, user.userId, user);
    if (response) {
      yield put(updateAboutSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(updateAboutFailure(error.message ? error.message : error))
  }
}

function* chatSaga() {
  yield takeEvery(GET_CHAT_CONTACTS, getChatContacts)
  yield takeEvery(UPLOAD_DOCUMENT, uploadDoc)
  yield takeEvery(GET_SELECT_CHAT_DOCUMENTS, getDoc)
  yield takeEvery(UPDATE_ABOUT, updateAbout)
}

export default chatSaga
