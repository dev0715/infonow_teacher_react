import { call, put, takeEvery } from "redux-saga/effects"


// Login Redux States
import {
  UPDATE_PASSWORD,
  UPDATE_PROFILE_DATA,
  UPLOAD_PROFILE_PICTURE
} from "./actionTypes"


import {
  uploadProfilePictureFailure,
  uploadProfilePictureSuccess,
  updatePasswordSuccess,
  updatePasswordFailure,
  updateProfileDataFailure,
  updateProfileDataSuccess
} from "./actions"

//Include Both Helper File with needed methods
import {
  updateProfileData,
  uploadProfilePicture,
  updatePassword,
  getLoggedInUser,

} from "../../../helpers/backend-helpers"


function* updatePasswordHttp({ payload }) {
  try {
    let user = getLoggedInUser() || {}
    const response = yield call(updatePassword, user.userId, payload);
    if (response) {
      yield put(updatePasswordSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(updatePasswordFailure(error.message ? error.message : error))
  }
}

function* uploadProfilePictureHttp({ payload }) {
  try {
    let user = getLoggedInUser() || {}
    const response = yield call(uploadProfilePicture, user.userId, payload);
    if (response) {
      yield put(uploadProfilePictureSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(uploadProfilePictureFailure(error.message ? error.message : error))
  }
}

function* updateProfileDataHttp({ payload }) {
  try {
    let user = getLoggedInUser() || {}
    console.log("data", payload)
    const response = yield call(updateProfileData, user.userId, payload);
    if (response) {
      yield put(updateProfileDataSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(updateProfileDataFailure(error.message ? error.message : error))
  }
}


function* profileSaga() {
  yield takeEvery(UPDATE_PASSWORD, updatePasswordHttp)
  yield takeEvery(UPLOAD_PROFILE_PICTURE, uploadProfilePictureHttp)
  yield takeEvery(UPDATE_PROFILE_DATA, updateProfileDataHttp)
}

export default profileSaga
