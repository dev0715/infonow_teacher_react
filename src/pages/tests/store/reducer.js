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

    UNASSIGN_TEST,
    UNASSIGN_TEST_SUCCESS,
    UNASSIGN_TEST_FAILURE,


} from './actionTypes'

const initialState = {
    tests: [],
    studentTestsLoading: false,
    studentTestsError: null,

    teacherTestsLoading: false,
    teacherTestsError: null,

    newTest: {},
    newTestLoading: false,
    newTestSuccess: false,
    newTestError: null,

    updateTest: {},
    updateTestLoading: false,
    updateTestSuccess: false,
    updateTestTestError: null,

    assignTest: {},
    assignTestSuccess: false,
    assignTestLoading: false,
    assignTestError: null,

    pastStudents: [],
    pastStudentsLoading: false,
    pastStudentsError: null,

    upcomingStudents: [],
    upcomingStudentsLoading: false,
    upcomingStudentsError: null,

    unassignTestSuccess: false,
    unassignTestLoading: false,
    unassignTestError: string,
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
                newTestSuccess: false,
                newTestError: null
            }
            break;
        case POST_TEST_SUCCESS:
            state = {
                ...state,
                newTest: action.payload,
                newTestSuccess: true,
                newTestLoading: false,
                newTestError: null,
            }
            break;
        case POST_TEST_FAILURE:
            state = {
                ...state,
                newTestLoading: false,
                newTestSuccess: false,
                newTestError: action.payload,
            }
            break;
        case PUT_TEST:
            state = {
                ...state,
                updateTestSuccess: false,
                updateTestLoading: true,
                updateTestError: null
            }
            break;
        case PUT_TEST_SUCCESS:
            state = {
                ...state,
                updateTest: action.payload,
                updateTestSuccess: true,
                updateTestLoading: false,
                updateTestError: null,
            }
            break;
        case PUT_TEST_FAILURE:
            state = {
                ...state,
                updateTestSuccess: false,
                updateTestLoading: false,
                updateTestError: action.payload,
            }
            break;
        case ASSIGN_TEST:
            state = {
                ...state,
                assignTestSuccess: false,
                assignTestLoading: true,
                assignTestError: null
            }
            break;
        case ASSIGN_TEST_SUCCESS:
            state = {
                ...state,
                assignTest: action.payload,
                assignTestSuccess: true,
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
        case UNASSIGN_TEST:
            state = {
                ...state,
                unassignTestSuccess: false,
                unassignTestLoading: true,
                unassignTestError: null
            }
            break;
        case UNASSIGN_TEST_SUCCESS:
            state = {
                ...state,
                unassignTestSuccess: true,
                unassignTestLoading: false,
                unassignTestError: null,
            }
            break;
        case UNASSIGN_TEST_FAILURE:
            state = {
                ...state,
                unassignTestSuccess: false,
                unassignTestLoading: false,
                unassignTestError: action.payload,
            }
            break;
        default:
            state = { ...state }
    }
    return state;
}
