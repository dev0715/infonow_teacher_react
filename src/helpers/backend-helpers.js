import { post, del, get, put, postForm, putForm } from "./api_helper"
import * as  url from "./url_helper"

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("authUser")
  return user ? JSON.parse(user) : null;
}

export const setLoggedInUser = (obj = {}) => {
  localStorage.setItem("authUser", JSON.stringify(obj))
}

export const getAuthentication = () => {
  const tokenInfo = localStorage.getItem("authToken")
  return tokenInfo ? JSON.parse(tokenInfo) : null;
}

//is user is logged in
export const isUserAuthenticated = () => {
  return getAuthentication() !== null
}




// Chats
export const getChatContactsRequest = id => get(url.GET_CHATS_CONTACTS(id))
export const getChatDocuments = id => get(url.GET_CHAT_DOCUMENTS(id))
export const updateUser = (id, data) => put(url.UPDATE_USER(id), data)

// Student Actions
export const postStudentLogin = data => post(url.POST_TEACHER_LOGIN, data);

export const getStudentAllMeetings = userId => get(url.GET_ALL_MEETINGS(userId));

export const getAllStudents = () => get(url.GET_STUDENTS);

export const getStudentProfile = studentId => get(url.GET_STUDENT_BY_ID(studentId));

export const getAllStudentTest = studentId => get(url.GET_STUDENT_TEST(studentId));

export const getStudentTestAttempts = (studentId, testId) => get(url.GET_STUDENT_ATTEMPTS(studentId, testId));

export const getAttemptDetail = (attemptId) => get(url.GET_ATTEMPT_DETAIL(attemptId));

export const getTestDetail = (testId) => get(url.GET_TEST_BY_ID(testId));

export const getTests = () => get(url.GET_TESTS);

export const postTest = data => postForm(url.POST_TEST, data);

export const putTest = data => putForm(url.PUT_TEST, data);

export const assignTest = (testId, data) => post(url.POST_ASSIGN_TEST(testId), data);

export const getTestPastStudent = (testId) => get(url.GET_TEST_PAST_STUDENT(testId));

export const getTestUpcomingStudent = (testId) => get(url.GET_TEST_UPCOMING_STUDENT(testId));

export const unassignTest = (testId, studentTestId) => delete (url.UNASSIGN_TEST(testId), studentTestId);

//Lessons

export const getTopics = () => get(url.TOPICS);
export const getLesson = (id) => get(url.GET_LESSON(id));
export const getRecentLessons = (id) => get(url.GET_RECENT_LESSONS);
export const getTopicLessons = id => get(url.GET_TOPIC_LESSONS(id));
export const uploadNewTopic = data => postForm(url.TOPICS, data);
export const uploadNewLesson = data => post(url.LESSONS, data);
export const assignLessonToStudents = data => post(url.ASSIGN_LESSON_TO_STUDENTS, data);
export const unassignLessonToStudents = data => del(url.ASSIGN_LESSON_TO_STUDENTS, data);


//Blogs 
export const getBlogList = () => get(url.GET_BLOG_LIST)
export const getBlog = (id) => get(url.GET_BLOG(id))
export const getBlogCategories = () => get(url.GET_BLOG_CATEGORIES)
export const getBlogComments = (id) => get(url.GET_BLOG_COMMENTS(id))
export const postCommentOnBlog = (data) => post(url.COMMENT_ON_BLOG, data)


//Documents
export const getUserDocuments = () => get(url.GET_USER_DOCUMENTS)
export const deleteUserDocument = (id) => del(url.DELETE_USER_DOCUMENTS(id))
export const uploadDocument = (data, options) => postForm(url.UPLOAD_DOCUMENT_URL, data, options);



