
// export const BASE_URL = `http://192.168.10.102:3600`
// export const MEETING_API_URL = `http://192.168.10.104:3900`
// export const CHAT_API_URL = `http://192.168.10.104:3700`
// export const CHAT_SOCKET_API_URL = `http://192.168.10.104:3701`
// export const BLOG_API_URL = `http://192.168.10.102:1337`

export const BASE_URL = `https://api.meditati.ro/main`
export const MEETING_API_URL = `https://meeting.meditati.ro/api`
export const CHAT_API_URL = `https://api.meditati.ro/chat`
export const CHAT_SOCKET_API_URL = `https://api.meditati.ro/live-chat`
export const BLOG_API_URL = `https://api.meditati.ro/blog`

export const BASE_API_URL = `${BASE_URL}/api/v1`
export const IMAGES_BASE_URL = `${BASE_URL}/public`
export const DOCUMENT_BASE_URL = `${BASE_URL}/public`


export const GET_IMAGE_URL = url => url ? DOCUMENT_BASE_URL + url : DOCUMENT_BASE_URL + "/profile-pictures/default.png"

export const GET_BLOG_IMAGE_URL = url => BLOG_API_URL + url

export const GET_DOCUMENT_URL = url => DOCUMENT_BASE_URL + url

export const getProfileImageUrl = url => url ? IMAGES_BASE_URL + url : IMAGES_BASE_URL + "/profile-pictures/default.png"

// Login
export const POST_TEACHER_LOGIN = `${BASE_URL}/authenticate/teacher`

//Tests
export const POST_TEST = `${BASE_API_URL}/tests`
export const PUT_TEST = `${BASE_API_URL}/tests`
export const GET_TESTS = `${BASE_API_URL}/tests`
export const GET_TEST_BY_ID = testId => `${BASE_API_URL}/tests/${testId}`
export const GET_TEST_PAST_STUDENT = testId => `${BASE_API_URL}/tests/${testId}/past-test`
export const GET_TEST_UPCOMING_STUDENT = testId => `${BASE_API_URL}/tests/${testId}/upcoming-test`
export const POST_ASSIGN_TEST = (testId) => `${BASE_API_URL}/tests/${testId}/assign`
export const UNASSIGN_TEST = (testId) => `${BASE_API_URL}/tests/${testId}/unassign`

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
export const GET_CHAT_DOCUMENTS = id => `${BASE_URL}/documents?chatId=${id}`
export const UPDATE_USER = id => `${BASE_URL}/api/v1/teacher/${id}/profile`

// Meetings
export const GET_ALL_MEETINGS = id => `${MEETING_API_URL}/users/${id}/meetings`


//Document

export const UPLOAD_DOCUMENT_URL = `${BASE_URL}/documents`;
export const GET_USER_DOCUMENTS = `${BASE_URL}/documents`
export const DELETE_USER_DOCUMENTS = id => `${BASE_URL}/documents/${id}`

//Blog
export const GET_BLOG_LIST = `${BASE_API_URL}/strapi/blogs`
export const GET_BLOG = id => `${BASE_API_URL}/strapi/blogs/${id}`
export const GET_BLOG_CATEGORIES = `${BASE_API_URL}/strapi/categories`
export const GET_BLOG_COMMENTS = id => `${BASE_API_URL}/strapi/blogs/${id}/comments`
export const COMMENT_ON_BLOG = `${BASE_API_URL}/strapi/comments`

export const UPLOAD_BLOG_IMAGE_URL = `${BASE_API_URL}/strapi/uploads`;

//Lessons

export const TOPICS = `${BASE_API_URL}/strapi/topics`
export const GET_TOPIC_LESSONS = id => `${BASE_API_URL}/strapi/topics/${id}/lessons`
export const LESSONS = `${BASE_API_URL}/strapi/lessons`
export const GET_LESSON = id => `${BASE_API_URL}/strapi/lessons/${id}`
export const GET_RECENT_LESSONS = `${BASE_API_URL}/strapi/recent-lessons`
export const ASSIGN_LESSON_TO_STUDENTS = `${BASE_API_URL}/strapi/student-lessons`
