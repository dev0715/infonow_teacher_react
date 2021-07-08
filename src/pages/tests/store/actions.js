import {
    GET_STUDENT_TESTS,
    GET_STUDENT_TESTS_SUCCESS,
    GET_STUDENT_TESTS_FAILURE,
    GET_TEACHER_TESTS,
    GET_TEACHER_TESTS_SUCCESS,
    GET_TEACHER_TESTS_FAILURE,
} from './actionTypes'

export const getStudentTests = (studentId) => {
    return {
        type: GET_STUDENT_TESTS,
        payload: studentId
    }
}

export const getStudentTestsSuccess = (tests) => {
    return {
        type: GET_STUDENT_TESTS_SUCCESS,
        payload: tests
    }
}

export const getStudentTestsFailure = (error) => {
    return {
        type: GET_STUDENT_TESTS_FAILURE,
        payload: error
    }
}

export const getTeacherTests = () => {
    return {
        type: GET_TEACHER_TESTS
    }
}

export const getTeacherTestsSuccess = (tests) => {
    return {
        type: GET_TEACHER_TESTS_SUCCESS,
        payload: tests
    }
}

export const getTeacherTestsFailure = (error) => {
    return {
        type: GET_TEACHER_TESTS_FAILURE,
        payload: error
    }
}



