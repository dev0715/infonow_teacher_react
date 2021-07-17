import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import {
    GET_STUDENT_TESTS,
    GET_TEACHER_TESTS,
    POST_TEST
} from "./actionTypes"

import {
    getStudentTestsSuccess, getStudentTestsFailure,
    getTeacherTestsSuccess, getTeacherTestsFailure,
    postTestSuccess, postTestFailure
} from "./actions"

import {
    getAllStudentTest,
    getTests,
    postTest
} from '@helpers/backend-helpers'

function* getStudentTestsHttp({ payload: studentId }) {
    try {
        const response = yield call(getAllStudentTest, studentId);
        yield put(getStudentTestsSuccess(response))
    } catch (error) {
        yield put(getStudentTestsFailure(error))
    }
}

function* getTeacherTestsHttp() {
    try {
        const response = yield call(getTests);
        yield put(getTeacherTestsSuccess(response))
    } catch (error) {
        yield put(getTeacherTestsFailure(error))
    }
}

function* postTestHttp({ payload: { test } }) {
    try {
        const response = yield call(postTest, test);
        yield put(postTestSuccess(response))
    } catch (error) {
        yield put(postTestFailure(error))
    }
}

function* TestsSaga() {
    yield takeEvery(GET_STUDENT_TESTS, getStudentTestsHttp)
    yield takeEvery(GET_TEACHER_TESTS, getTeacherTestsHttp)
    yield takeEvery(POST_TEST, postTestHttp)
}

export default TestsSaga
