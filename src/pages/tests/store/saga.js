import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import {
    GET_STUDENT_TESTS,
    GET_TEACHER_TESTS
} from "./actionTypes"
import {
    getStudentTestsSuccess, getStudentTestsFailure,
    getTeacherTestsSuccess, getTeacherTestsFailure
} from "./actions"
import { getAllStudentTest, getTests } from '@helpers/backend-helpers'



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


function* TestsSaga() {
    yield takeEvery(GET_STUDENT_TESTS, getStudentTestsHttp)
    yield takeEvery(GET_TEACHER_TESTS, getTeacherTestsHttp)
}

export default TestsSaga
