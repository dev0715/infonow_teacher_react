
export const BASE_URL = `http://192.168.10.102:3600`
export const BASE_API_URL = `${BASE_URL}/api/v1`
export const IMAGES_BASE_URL = `${BASE_URL}/public`
export const MEETING_API_URL = `http://192.168.10.104:3900`
export const CHAT_API_URL = `http://192.168.10.104:3700`


export const getProfileImageUrl = url => url ? IMAGES_BASE_URL + url : IMAGES_BASE_URL + "/profile-pictures/default.png"

// Login
export const POST_TEACHER_LOGIN = `${BASE_URL}/authenticate/teacher`

//Tests
export const POST_TEST = `${BASE_API_URL}/tests`
export const PUT_TEST = `${BASE_API_URL}/tests`
export const GET_TESTS = `${BASE_API_URL}/tests`
export const GET_TEST_BY_ID = testId => `${BASE_API_URL}/tests/${testId}`
export const POST_ASSIGN_TEST_STUDENT = testId => `${BASE_API_URL}/tests/${testId}/assign`

//STUDENTS
export const GET_STUDENTS = `${BASE_API_URL}/students`
export const GET_STUDENT_BY_ID = id => `${BASE_API_URL}/students/${id}`
export const GET_STUDENT_TEST = (studentId) => `${BASE_API_URL}/students/${studentId}/tests`


//ATTEMPTS
export const GET_STUDENT_ATTEMPTS = (studentId, testId) => `${BASE_API_URL}/students/${studentId}/tests/${testId}/attempts`
export const GET_ATTEMPT_DETAIL = id => `${BASE_API_URL}/attempts/${id}`
export const PUT_SUBJECTIVE_ATTEMPT_MARKS = id => `${BASE_API_URL}/attempts/${id}/subjective-marks`

// Chats
export const GET_CHATS_CONTACTS = id => `${CHAT_API_URL}/users/${id}/chats`

// Meetings
export const GET_ALL_MEETINGS = id => `${MEETING_API_URL}/users/${id}/meetings`




