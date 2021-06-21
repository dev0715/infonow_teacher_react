import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { GET_ALL_MEETINGS } from "./actionTypes"
import { getAllMeetingsSuccess, getAllMeetingsError } from "./actions"
import { getLoggedInUser, getStudentAllMeetings } from '@helpers/backend-helpers'


function* getAllMeetingsHttp() {
    try {
        let user = getLoggedInUser();
        const response = yield call(getStudentAllMeetings, user.userId);
        yield put(getAllMeetingsSuccess(response))
    } catch (error) {
        yield put(getAllMeetingsError(error))
    }
}


function* MeetingsSaga() {
    yield takeEvery(GET_ALL_MEETINGS, getAllMeetingsHttp)
}

export default MeetingsSaga
