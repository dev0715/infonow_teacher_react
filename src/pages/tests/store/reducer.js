import { string } from 'prop-types';
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

const initialState = {
    tests: [],
    studentTestsLoading: false,
    studentTestsError: null,

    teacherTestsLoading: false,
    teacherTestsError: null,

    newTest: {},
    newTestLoading: false,
    newTestError: null,

    updateTest: {},
    updateTestLoading: false,
    updateTestTestError: null,

    assignTest: {},
    assignTestSuccessMessage: string,
    assignTestLoading: false,
    assignTestError: null,

    pastStudents: [],
    pastStudentsLoading: false,
    pastStudentsError: null,

    upcomingStudents: [],
    upcomingStudentsLoading: false,
    upcomingStudentsError: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_STUDENT_TESTS:
            state = {
                ...state,
                studentTestsLoading: true,
                studentTestsError: null
            }
            break;
        case GET_STUDENT_TESTS_SUCCESS:
            console.log("GET_STUDENT_TESTS_SUCCESS", action.payload);
            state = {
                ...state,
                tests: action.payload,
                studentTestsLoading: false,
                studentTestsError: null,
            }
            break;
        case GET_STUDENT_TESTS_FAILURE:
            state = {
                ...state,
                studentTestsLoading: false,
                studentTestsError: action.payload,
            }
            break;
        case GET_TEACHER_TESTS:
            state = {
                ...state,
                teacherTestsLoading: true,
                teacherTestsError: null
            }
            break;
        case GET_TEACHER_TESTS_SUCCESS:
            state = {
                ...state,
                tests: action.payload,
                teacherTestsLoading: false,
                teacherTestsError: null,
            }
            break;
        case GET_TEACHER_TESTS_FAILURE:
            state = {
                ...state,
                teacherTestsLoading: false,
                teacherTestsError: action.payload,
            }
            break;
        case POST_TEST:
            state = {
                ...state,
                newTestLoading: true,
                newTestError: null
            }
            break;
        case POST_TEST_SUCCESS:
            state = {
                ...state,
                newTest: action.payload,
                newTestLoading: false,
                newTestError: null,
            }
            break;
        case POST_TEST_FAILURE:
            state = {
                ...state,
                newTestLoading: false,
                newTestError: action.payload,
            }
            break;
        case PUT_TEST:
            state = {
                ...state,
                updateTestLoading: true,
                updateTestError: null
            }
            break;
        case PUT_TEST_SUCCESS:
            state = {
                ...state,
                updateTest: action.payload,
                updateTestLoading: false,
                updateTestError: null,
            }
            break;
        case PUT_TEST_FAILURE:
            state = {
                ...state,
                updateTestLoading: false,
                updateTestError: action.payload,
            }
            break;
        case ASSIGN_TEST:
            state = {
                ...state,
                assignTestLoading: true,
                assignTestError: null
            }
            break;
        case ASSIGN_TEST_SUCCESS:
            state = {
                ...state,
                assignTest: action.payload,
                assignTestSuccessMessage: action.payload,
                assignTestLoading: false,
                assignTestError: null,
            }
            break;
        case ASSIGN_TEST_FAILURE:
            state = {
                ...state,
                assignTestLoading: false,
                assignTestError: action.payload,
            }
            break;
        case GET_PAST_STUDENT:
            state = {
                ...state,
                pastStudentsLoading: true,
                pastStudentsError: null
            }
            break;
        case GET_PAST_STUDENT_SUCCESS:
            state = {
                ...state,
                pastStudents: action.payload,
                pastStudentsLoading: false,
                pastStudentsError: null,
            }
            break;
        case GET_PAST_STUDENT_FAILURE:
            state = {
                ...state,
                pastStudentsLoading: false,
                pastStudentsError: action.payload,
            }
            break;
        case GET_UPCOMING_STUDENT:
            state = {
                ...state,
                upcomingStudentsLoading: true,
                upcomingStudentsError: null
            }
            break;
        case GET_UPCOMING_STUDENT_SUCCESS:
            state = {
                ...state,
                upcomingStudents: action.payload,
                upcomingStudentsLoading: false,
                upcomingStudentsError: null,
            }
            break;
        case GET_UPCOMING_STUDENT_FAILURE:
            state = {
                ...state,
                upcomingStudentsLoading: false,
                upcomingStudentsError: action.payload,
            }
            break;
        default:
            state = { ...state }
    }
    return state;
}
