import { call, put, takeEvery } from "redux-saga/effects"


// Login Redux States
import {
  GET_TEACHER_TOPIC_LESSONS,
  GET_TEACHER_TOPICS,
  ADD_NEW_TOPIC,
  ADD_NEW_LESSON,
  GET_LESSON,
  GET_TEACHER_RECENT_LESSONS,
  GET_STUDENTS_FOR_LESSON,
  ASSIGN_LESSON_TO_STUDENTS,
  UNASSIGN_LESSON_TO_STUDENTS,
} from "./actionTypes"


import {
  getTeacherTopicLessonsFailure,
  getTeacherTopicLessonsSuccess,
  getTeacherTopicsFailure,
  getTeacherTopicsSuccess,
  addNewTopicFailure,
  addNewTopicSuccess,
  addNewLessonFailure,
  addNewLessonSuccess,
  getLessonFailure,
  getLessonSuccess,
  getTeacherRecentLessonsFailure,
  getTeacherRecentLessonsSuccess,
  getStudentsForLessonFailure,
  getStudentsForLessonSuccess,
  assignLessonToStudentsFailure,
  assignLessonToStudentsSuccess,
  unassignLessonToStudentsSuccess,
  unassignLessonToStudentsFailure
} from "./actions"

//Include Both Helper File with needed methods
import {
  getTopicLessons,
  getTopics,
  uploadNewTopic,
  uploadNewLesson,
  getLesson,
  getRecentLessons,
  getAllStudents,
  assignLessonToStudents,
  unassignLessonToStudents
} from "../../../helpers/backend-helpers"

function* getTopicsHttp() {
  try {
    const response = yield call(getTopics);
    if (response) {
      yield put(getTeacherTopicsSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(getTeacherTopicsFailure(error.message ? error.message : error))
  }
}

function* getTeacherTopicLessonsHttp({ payload }) {
  try {
    const response = yield call(getTopicLessons, payload);
    if (response) {
      yield put(getTeacherTopicLessonsSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(getTeacherTopicLessonsFailure(error.message ? error.message : error))
  }
}

function* addNewTopicHttp({ payload: { title, description, file } }) {
  try {


    let formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("file", file)

    const response = yield call(uploadNewTopic, formData);
    if (response) {
      yield put(addNewTopicSuccess(response))
      return;
    }
    throw "Unknown response received from Server";


  } catch (error) {
    yield put(addNewTopicFailure(error.message ? error.message : error))
  }
}

function* addNewLessonHttp({ payload }) {
  try {

    const response = yield call(uploadNewLesson, payload);
    if (response) {
      yield put(addNewLessonSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(addNewLessonFailure(error.message ? error.message : error))
  }
}

function* getLessonHttp({ payload }) {
  try {
    const response = yield call(getLesson, payload);
    if (response) {
      yield put(getLessonSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(getLessonFailure(error.message ? error.message : error))
  }
}

function* getTeacherRecentLessonsHttp() {
  try {
    const response = yield call(getRecentLessons);
    if (response) {
      yield put(getTeacherRecentLessonsSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(getTeacherRecentLessonsFailure(error.message ? error.message : error))
  }
}

function* getStudentsForLessonHttp() {
  try {
    const response = yield call(getAllStudents);
    if (response) {
      yield put(getStudentsForLessonSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(getStudentsForLessonFailure(error.message ? error.message : error))
  }
}


function* assignLessonToStudentsHttp({ payload }) {
  try {

    const response = yield call(assignLessonToStudents, payload);
    if (response) {
      yield put(assignLessonToStudentsSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(assignLessonToStudentsFailure(error.message ? error.message : error))
  }
}


function* unassignLessonToStudentsHttp({ payload }) {
  try {
    const response = yield call(unassignLessonToStudents, payload);
    if (response) {
      yield put(unassignLessonToStudentsSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(unassignLessonToStudentsFailure(error.message ? error.message : error))
  }
}


function* teacherLessonSaga() {
  yield takeEvery(GET_TEACHER_TOPICS, getTopicsHttp)
  yield takeEvery(GET_TEACHER_TOPIC_LESSONS, getTeacherTopicLessonsHttp)
  yield takeEvery(ADD_NEW_TOPIC, addNewTopicHttp)
  yield takeEvery(ADD_NEW_LESSON, addNewLessonHttp)
  yield takeEvery(GET_LESSON, getLessonHttp)
  yield takeEvery(GET_TEACHER_RECENT_LESSONS, getTeacherRecentLessonsHttp)
  yield takeEvery(GET_STUDENTS_FOR_LESSON, getStudentsForLessonHttp)
  yield takeEvery(ASSIGN_LESSON_TO_STUDENTS, assignLessonToStudentsHttp)
  yield takeEvery(UNASSIGN_LESSON_TO_STUDENTS, unassignLessonToStudentsHttp)
}

export default teacherLessonSaga
