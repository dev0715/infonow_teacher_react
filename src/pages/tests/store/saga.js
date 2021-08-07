import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import {
    GET_STUDENT_TESTS,
    GET_TEACHER_TESTS,
    POST_TEST,
    PUT_TEST,
    ASSIGN_TEST,
    GET_PAST_STUDENT,
    GET_UPCOMING_STUDENT,
    UNASSIGN_TEST
} from "./actionTypes"

import {
    getStudentTestsSuccess, getStudentTestsFailure,
    getTeacherTestsSuccess, getTeacherTestsFailure,
    postTestSuccess, postTestFailure,
    putTestSuccess, putTestFailure,
    assignTestSuccess, assignTestFailure,
    getPastStudentSuccess, getPastStudentFailure,
    getUpcomingStudentSuccess, getUpcomingStudentFailure,
    unassignTestSuccess, unassignTestFailure
} from "./actions"

import {
    getAllStudentTest,
    getTests,
    postTest,
    putTest,
    assignTest,
    getTestPastStudent,
    getTestUpcomingStudent,
    unassignTest
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

function* putTestHttp({ payload: { test } }) {
    try {
        const response = yield call(putTest, test);
        yield put(putTestSuccess(response))
    } catch (error) {
        yield put(putTestFailure(error))
    }
}

function* assignTestHttp({ payload: { data } }) {
    try {
        const response = yield call(assignTest, data.testId, data);
        yield put(assignTestSuccess(response))
    } catch (error) {
        yield put(assignTestFailure(error))
    }
}

function* getPastStudentHttp({ payload: testId }) {
    try {
        const response = yield call(getTestPastStudent, testId);
        yield put(getPastStudentSuccess(response))
    } catch (error) {
        yield put(getPastStudentFailure(error))
    }
}

function* getUpcomingStudentHttp({ payload: testId }) {
    try {
        const response = yield call(getTestUpcomingStudent, testId);
        yield put(getUpcomingStudentSuccess(response))
    } catch (error) {
        yield put(getUpcomingStudentFailure(error))
    }
}

function* unassignStudentTestHttp({ payload: { data } }) {
    try {
        let studentTestId = { "studentTestId": data.studentTestId }
        const response = yield call(unassignTest, data.testId, studentTestId);
        yield put(unassignTestSuccess(response))
    } catch (error) {
        yield put(unassignTestFailure(error))
    }
}

function* TestsSaga() {
    yield takeEvery(GET_STUDENT_TESTS, getStudentTestsHttp)
    yield takeEvery(GET_TEACHER_TESTS, getTeacherTestsHttp)
    yield takeEvery(POST_TEST, postTestHttp)
    yield takeEvery(PUT_TEST, putTestHttp)
    yield takeEvery(ASSIGN_TEST, assignTestHttp)
    yield takeEvery(GET_PAST_STUDENT, getPastStudentHttp)
    yield takeEvery(GET_UPCOMING_STUDENT, getUpcomingStudentHttp)
    yield takeEvery(UNASSIGN_TEST, unassignStudentTestHttp)
}

export default TestsSaga
