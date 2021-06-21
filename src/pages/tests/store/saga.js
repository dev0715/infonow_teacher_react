import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { GET_STUDENT_TESTS } from "./actionTypes"
import { getStudentTestsSuccess, getStudentTestsFailure } from "./actions"
import { getAllStudentTest } from '@helpers/backend-helpers'



function* getStudentTestsHttp({ payload: studentId }) {
    try {
        const response = yield call(getAllStudentTest, studentId);
        yield put(getStudentTestsSuccess(response))
    } catch (error) {
        yield put(getStudentTestsFailure(error))
    }
}


function* TestsSaga() {
    yield takeEvery(GET_STUDENT_TESTS, getStudentTestsHttp)
}

export default TestsSaga
