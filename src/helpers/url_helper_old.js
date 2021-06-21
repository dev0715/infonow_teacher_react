export const BASE_URL = `http://localhost:3900`


/*********************************************************/
/******************  INSTITUTE URLS **********************/
/*********************************************************/

// Authentication
export const POST_INSTITUTE_LOGIN                   = `/institute/authenticate`
export const PUT_INSTITUTE_CHANGE_PASSWORD          = `/institute/password`

// Groups
export const GET_INSTITUTE_GROUPS                   = `/institute/group`
export const POST_INSTITUTE_GROUPS                  = `/institute/group`
export const GET_INSTITUTE_GROUP_STUDENTS           = id => `/institute/group/${id}/student`
export const GET_INSTITUTE_GROUP_TESTS              = id => `/institute/group/${id}/test`

// Dashboard
export const GET_INSTITUTE_DASHBOARD_STATS          = `/institute/dashboard`

// Student
export const GET_INSTITUTE_STUDENTS                 = `/institute/student`
export const POST_INSTITUTE_STUDENT                 = `/institute/student`
export const PUT_INSTITUTE_STUDENT                  = `/institute/student`
export const DELETE_INSTITUTE_STUDENT               = `/institute/student`
export const GET_INSTITUTE_STUDENT_GROUPS           = id => `/institute/student/${id}/group`
export const POST_INSTITUTE_STUDENT_GROUPS          = id => `/institute/student/${id}/group`
export const GET_INSTITUTE_STUDENT_TESTS            = id => `/institute/student/${id}/test`

// Tests
export const POST_INSTITUTE_TEST                    = `/institute/test`
export const GET_INSTITUTE_TESTS                    = `/institute/test`
export const DELETE_INSTITUTE_TEST                  = `/institute/test`
export const POST_INSTITUTE_TEST_GROUPS             = id => `/institute/test/${id}/groups`
export const GET_INSTITUTE_STUDENT_PAST_TESTS       = studentId => `/institute/student/${studentId}/attempts`
export const GET_INSTITUTE_STUDENT_TEST_ATTEMPT     = attemptId => `/institute/student/attempts/${attemptId}`
export const GET_INSTITUTE_TEST_RESULTS             = groupTestId => `/institute/group-test-result/${groupTestId}`

/*********************************************************/
/********************  STUDENT URLS **********************/
/*********************************************************/

// Authentication
export const POST_STUDENT_LOGIN                     =  `/student/authenticate`
export const PUT_STUDENT_CHANGE_PASSWORD            = `/student/password`

// Tests
export const GET_STUDENT_UPCOMING_TESTS             = `/student/upcoming-tests`
export const GET_STUDENT_TESTS                      = `/student/test`

// Attempts
export const GET_STUDENT_PAST_TESTS                 = `/student/attempts`
export const POST_STUDENT_ATTEMPT                   = `/student/attempts`
export const PUT_STUDENT_ATTEMPT                    = `/student/attempts`
export const GET_STUDENT_TEST_ATTEMPT               = attemptId => `/student/attempts/${attemptId}`

/*********************************************************/
/**********************  ADMIN URLS **********************/
/*********************************************************/

// Authentication
export const POST_ADMIN_LOGIN                       = `/admin/authenticate`
export const PUT_ADMIN_CHANGE_PASSWORD              = `/admin/password`

// Institutes
export const GET_ADMIN_INSTITUTES                   = `/admin/institute`
export const GET_ADMIN_INSTITUTE                    = id => `/admin/institute/${id}`
export const POST_ADMIN_INSTITUTE                   = `/admin/institute`
export const PUT_ADMIN_INSTITUTE                    = `/admin/institute`
export const DELETE_ADMIN_INSTITUTE                 = `/admin/institute`
export const GET_ADMIN_AUTHENTICATE_AS_ADMIN        = id => `/admin/institute/authenticate/${id}`

// User management
export const GET_ADMINS                             = `/admin`
export const GET_ADMIN                              = id => `/admin/${id}`
export const POST_ADMIN                             = `/admin`
export const PUT_ADMIN                              = `/admin`

/*********************************************************/
/*********************  UNIVERSAL URLS *******************/
/*********************************************************/

// Forget Password
export const POST_FORGET_PASSWORD                   = userType => `/${userType}/forget-password`
export const POST_RESET_PASSWORD                    = userType => `/${userType}/reset-password`





