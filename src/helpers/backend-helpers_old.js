import { post, del, get, put, postForm } from "./api_helper"
import * as url from "./url_helper_old"

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = getAuthentication()
  return user ? user.user : null;
}

export const getAuthentication = () => {
  const user = localStorage.getItem("authUser")
  return user ? JSON.parse(user) : null;
}

//is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

/*********************************************************/
/*********************  INSTITUTE ACTIONS ********************/
/*********************************************************/

// Authentication
export const postInstituteLogin           = data => post(url.POST_INSTITUTE_LOGIN, data)
export const putChangePasswordInstitute   = data => put(url.PUT_INSTITUTE_CHANGE_PASSWORD, data)

// Groups
export const getGroupsInstitute         = ()   => get(url.GET_INSTITUTE_GROUPS)
export const getGroupInstitute          = id   => get(`${url.GET_INSTITUTE_GROUPS}/${id}`)
export const postGroupInstitute         = data => post(`${url.POST_INSTITUTE_GROUPS}`, data)
export const getStudentsInstituteGroup  = id   => get(url.GET_INSTITUTE_GROUP_STUDENTS(id))
export const getTestsInstituteGroup     = id   => get(url.GET_INSTITUTE_GROUP_TESTS(id))

// Students
export const getStudentsInstitute   = () => get(url.GET_INSTITUTE_STUDENTS)
export const getStudentInstitute    = id => get(`${url.GET_INSTITUTE_STUDENTS}/${id}`)
export const postStudentInstitute   = data => post(url.POST_INSTITUTE_STUDENT, data)
export const putStudentInstitute    = data => put(url.PUT_INSTITUTE_STUDENT, data)
export const deleteStudent          = studentId => del(`${url.DELETE_INSTITUTE_STUDENT}/${studentId}`)
export const getInstituteStudentPastTests = studentId => get(url.GET_INSTITUTE_STUDENT_PAST_TESTS(studentId))

// Tests
export const postTestInstitute        = data => postForm(url.POST_INSTITUTE_TEST, data)
export const getTestsInstitute        = () => get(url.GET_INSTITUTE_TESTS)
export const getTestInstitute         = id => get(`${url.GET_INSTITUTE_TESTS}/${id}`)
export const deleteTest               = id => del(`${url.DELETE_INSTITUTE_TEST}/${id}`)
export const getStudentTests          = id => get(url.GET_INSTITUTE_STUDENT_TESTS(id))
export const postTestGroupsInstitute  = data => post(url.POST_INSTITUTE_TEST_GROUPS(data.testId), data)
export const getInstituteStudentTestAttempt = attemptId => get(url.GET_INSTITUTE_STUDENT_TEST_ATTEMPT(attemptId))
export const getInstituteTestResults = groupTestId => get(url.GET_INSTITUTE_TEST_RESULTS(groupTestId))

// General
export const getMainStats = () => get(url.GET_INSTITUTE_DASHBOARD_STATS)

/*********************************************************/
/*********************  STUDENT ACTIONS ********************/
/*********************************************************/

export const postStudentLogin         = data => post(url.POST_STUDENT_LOGIN, data)
export const getStudentGroups         = id => get(url.GET_INSTITUTE_STUDENT_GROUPS(id))
export const postStudentGroups        = (id, data) => post(url.POST_INSTITUTE_STUDENT_GROUPS(id), { groupIds: data })
export const getTestStudent           = testId => get(`${url.GET_STUDENT_TESTS}/${testId}`)
export const getStudentAttempt        = attemptId => get(`${url.GET_STUDENT_PAST_TESTS}/${attemptId}`)
export const postStudentAttempt       = data => post(url.POST_STUDENT_ATTEMPT, data)
export const putStudentAttempt        = data => put(url.PUT_STUDENT_ATTEMPT, data)
export const putChangePasswordStudent = data => put(url.PUT_STUDENT_CHANGE_PASSWORD, data)
export const getStudentUpcomingTests  = () => get(url.GET_STUDENT_UPCOMING_TESTS)
export const getStudentPastTests      = () => get(url.GET_STUDENT_PAST_TESTS)
export const getStudentTestAttempt    = attemptId => get(url.GET_STUDENT_TEST_ATTEMPT(attemptId))

/*********************************************************/
/*********************  ADMIN ACTIONS ********************/
/*********************************************************/

// Authentication
export const postAdminLogin         = data => post(url.POST_ADMIN_LOGIN, data)
export const putChangePasswordAdmin = data => put(url.PUT_ADMIN_CHANGE_PASSWORD, data)

// Institutes
export const getAdminInstitutes       = () => get(url.GET_ADMIN_INSTITUTES)
export const getAdminInstitute        = id => get(url.GET_ADMIN_INSTITUTE(id))
export const postAdminInstitute       = data => post(url.POST_ADMIN_INSTITUTE, data)
export const putAdminInstitute        = data => put(url.PUT_ADMIN_INSTITUTE, data)
export const authenticateAsInstitute  = id => get(url.GET_ADMIN_AUTHENTICATE_AS_ADMIN(id))
export const deleteAdminInstitute     = id => del(`${url.DELETE_ADMIN_INSTITUTE}/${id}`)

// User management
export const getAdminUsers  = () => get(url.GET_ADMINS)
export const getAdminUser   = id => get(url.GET_ADMIN(id))
export const postAdminUser  = data => post(url.POST_ADMIN, data)
export const putAdminUser   = data => put(url.PUT_ADMIN, data)

/*********************************************************/
/*******************  UNIVERSAL ACTIONS ******************/
/*********************************************************/

// Forget Password
export const postForgetPassword = user => post(url.POST_FORGET_PASSWORD(user.userType), user)
export const postResetPassword  = user => post(url.POST_RESET_PASSWORD(user.userType), user)




