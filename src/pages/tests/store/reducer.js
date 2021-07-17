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

        default:
            state = { ...state }
    }
    return state;
}
