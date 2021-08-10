import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import {
    GET_STUDENT_ASSIGNMENTS,
    GET_TEACHER_ASSIGNMENTS,
    POST_ASSIGNMENT,
    PUT_ASSIGNMENT,
    ASSIGN_ASSIGNMENT,
    GET_ASSIGNMENT_PAST_STUDENT,
    GET_ASSIGNMENT_UPCOMING_STUDENT,
    UNASSIGN_ASSIGNMENT
} from "./actionTypes"

import {
    getStudentAssignmentsSuccess, getStudentAssignmentsFailure,
    getTeacherAssignmentsSuccess, getTeacherAssignmentsFailure,
    postAssignmentSuccess, postAssignmentFailure,
    putAssignmentSuccess, putAssignmentFailure,
    assignAssignmentSuccess, assignAssignmentFailure,
    getAssignmentPastStudentSuccess, getAssignmentPastStudentFailure,
    getAssignmentUpcomingStudentSuccess, getAssignmentUpcomingStudentFailure,
    unassignAssignmentSuccess, unassignAssignmentFailure
} from "./actions"

import {
    getAllStudentAssignment,
    getAssignments,
    postAssignment,
    putAssignment,
    assignAssignment,
    getAssignmentPastStudent,
    getAssignmentUpcomingStudent,
    unassignAssignment
} from '@helpers/backend-helpers'

function* getStudentAssignmentsHttp({ payload: studentId }) {
    try {
        const response = yield call(getAllStudentAssignment, studentId);
        yield put(getStudentAssignmentsSuccess(response))
    } catch (error) {
        yield put(getStudentAssignmentsFailure(error))
    }
}

function* getTeacherAssignmentsHttp() {
    try {
        const response = yield call(getAssignments);
        yield put(getTeacherAssignmentsSuccess(response))
    } catch (error) {
        yield put(getTeacherAssignmentsFailure(error))
    }
}

function* postAssignmentHttp({ payload: { assignment } }) {
    try {
        const response = yield call(postAssignment, assignment);
        yield put(postAssignmentSuccess(response))
    } catch (error) {
        yield put(postAssignmentFailure(error))
    }
}

function* putAssignmentHttp({ payload: { assignment } }) {
    try {
        const response = yield call(putAssignment, assignment);
        yield put(putAssignmentSuccess(response))
    } catch (error) {
        yield put(putAssignmentFailure(error))
    }
}

function* assignAssignmentHttp({ payload: { data } }) {
    try {
        const response = yield call(assignAssignment, data.assignmentId, data);
        yield put(assignAssignmentSuccess(response))
    } catch (error) {
        yield put(assignAssignmentFailure(error))
    }
}

function* getAssignmentPastStudentHttp({ payload: testId }) {
    try {
        const response = yield call(getAssignmentPastStudent, testId);
        yield put(getAssignmentPastStudentSuccess(response))
    } catch (error) {
        yield put(getAssignmentPastStudentFailure(error))
    }
}

function* getAssignmentUpcomingStudentHttp({ payload: testId }) {
    try {
        const response = yield call(getAssignmentUpcomingStudent, testId);
        yield put(getAssignmentUpcomingStudentSuccess(response))
    } catch (error) {
        yield put(getAssignmentUpcomingStudentFailure(error))
    }
}

function* unassignStudentAssignmentHttp({ payload: { data } }) {
    try {
        let studentAssignmentId = { "studentAssignmentId": data.studentAssignmentId }
        const response = yield call(unassignAssignment, data.testId, studentAssignmentId);
        yield put(unassignAssignmentSuccess(response))
    } catch (error) {
        yield put(unassignAssignmentFailure(error))
    }
}

function* AssignmentsSaga() {
    yield takeEvery(GET_STUDENT_ASSIGNMENTS, getStudentAssignmentsHttp)
    yield takeEvery(GET_TEACHER_ASSIGNMENTS, getTeacherAssignmentsHttp)
    yield takeEvery(POST_ASSIGNMENT, postAssignmentHttp)
    yield takeEvery(PUT_ASSIGNMENT, putAssignmentHttp)
    yield takeEvery(ASSIGN_ASSIGNMENT, assignAssignmentHttp)
    yield takeEvery(GET_ASSIGNMENT_PAST_STUDENT, getAssignmentPastStudentHttp)
    yield takeEvery(GET_ASSIGNMENT_UPCOMING_STUDENT, getAssignmentUpcomingStudentHttp)
    yield takeEvery(UNASSIGN_ASSIGNMENT, unassignStudentAssignmentHttp)
}

export default AssignmentsSaga
