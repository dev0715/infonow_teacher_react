import { call, put, takeEvery } from "redux-saga/effects"


import {
    GET_TEST_ATTEMPTS,
    GET_ATTEMPT_DETAIL,
    GET_TEST_DETAIL
} from './actionTypes'

import {
    getTestAttemptsSuccess,
    getTestAttemptsFailure,
    getAttemptDetailSuccess,
    getAttemptDetailFailure,
    getTestDetailSuccess,
    getTestDetailFailure
} from "./actions"

import {
    getStudentTestAttempts,
    getAttemptDetail,
    getTestDetail
} from '@helpers/backend-helpers'


function* getTestAttemptsHttp({ payload: { studentId, testId } }) {
    try {
        const response = yield call(getStudentTestAttempts, studentId, testId);
        yield put(getTestAttemptsSuccess(response))
    } catch (error) {
        yield put(getTestAttemptsFailure(error))
    }
}

function* getAttemptDetailsHttp({ payload: { attemptId } }) {
    try {
        console.log("SAGA ATTEMPT ==>", attemptId)
        const response = yield call(getAttemptDetail, attemptId);
        yield put(getAttemptDetailSuccess(response))
    } catch (error) {
        yield put(getAttemptDetailFailure(error))
    }
}

function* getTestDetailsHttp({ payload: { testId } }) {
    try {
        console.log("SAGA test ==>", testId)
        const response = yield call(getTestDetail, testId);
        yield put(getTestDetailSuccess(response))
    } catch (error) {
        yield put(getTestDetailFailure(error))
    }
}


function* AttemptsSaga() {
    yield takeEvery(GET_TEST_ATTEMPTS, getTestAttemptsHttp)
    yield takeEvery(GET_ATTEMPT_DETAIL, getAttemptDetailsHttp)
    yield takeEvery(GET_TEST_DETAIL, getTestDetailsHttp)
}

export default AttemptsSaga
