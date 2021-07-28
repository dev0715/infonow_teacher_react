import {
    GET_STUDENT_TESTS,
    GET_STUDENT_TESTS_SUCCESS,
    GET_STUDENT_TESTS_FAILURE,

    GET_TEACHER_TESTS,
    GET_TEACHER_TESTS_SUCCESS,
    GET_TEACHER_TESTS_FAILURE,

    POST_TEST,
    POST_TEST_SUCCESS,
    POST_TEST_FAILURE,

    PUT_TEST,
    PUT_TEST_SUCCESS,
    PUT_TEST_FAILURE,

    ASSIGN_TEST,
    ASSIGN_TEST_SUCCESS,
    ASSIGN_TEST_FAILURE,

    GET_PAST_STUDENT,
    GET_PAST_STUDENT_SUCCESS,
    GET_PAST_STUDENT_FAILURE,

    GET_UPCOMING_STUDENT,
    GET_UPCOMING_STUDENT_SUCCESS,
    GET_UPCOMING_STUDENT_FAILURE,
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

export const postTest = (test) => {
    return {
        type: POST_TEST,
        payload: { test }
    }
}

export const postTestSuccess = (tests) => {
    return {
        type: POST_TEST_SUCCESS,
        payload: tests
    }
}

export const postTestFailure = (error) => {
    return {
        type: POST_TEST_FAILURE,
        payload: error
    }
}

export const putTest = (test) => {
    return {
        type: PUT_TEST,
        payload: { test }
    }
}

export const putTestSuccess = (tests) => {
    return {
        type: PUT_TEST_SUCCESS,
        payload: tests
    }
}

export const putTestFailure = (error) => {
    return {
        type: PUT_TEST_FAILURE,
        payload: error
    }
}


export const assignTest = (data) => {
    return {
        type: ASSIGN_TEST,
        payload: { data }
    }
}

export const assignTestSuccess = (tests) => {
    return {
        type: ASSIGN_TEST_SUCCESS,
        payload: tests
    }
}

export const assignTestFailure = (error) => {
    return {
        type: ASSIGN_TEST_FAILURE,
        payload: error
    }
}



export const getPastStudent = (testId) => {
    return {
        type: GET_PAST_STUDENT,
        payload: testId
    }
}

export const getPastStudentSuccess = (users) => {
    return {
        type: GET_PAST_STUDENT_SUCCESS,
        payload: users
    }
}

export const getPastStudentFailure = (error) => {
    return {
        type: GET_PAST_STUDENT_FAILURE,
        payload: error
    }
}


export const getUpcomingStudent = (testId) => {
    return {
        type: GET_UPCOMING_STUDENT,
        payload: testId
    }
}

export const getUpcomingStudentSuccess = (users) => {
    return {
        type: GET_UPCOMING_STUDENT_SUCCESS,
        payload: users
    }
}

export const getUpcomingStudentFailure = (error) => {
    return {
        type: GET_UPCOMING_STUDENT_FAILURE,
        payload: error
    }
}








