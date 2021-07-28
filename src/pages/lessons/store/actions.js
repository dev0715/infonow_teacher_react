import {
  GET_TEACHER_TOPICS,
  GET_TEACHER_TOPICS_SUCCESS,
  GET_TEACHER_TOPICS_FAILURE,
  GET_TEACHER_TOPIC_LESSONS,
  GET_TEACHER_TOPIC_LESSONS_SUCCESS,
  GET_TEACHER_TOPIC_LESSONS_FAILURE,
  GET_TEACHER_RECENT_LESSONS,
  GET_TEACHER_RECENT_LESSONS_SUCCESS,
  GET_TEACHER_RECENT_LESSONS_FAILURE,
  SELECT_TOPIC,
  SELECT_LESSON,
  ADD_NEW_TOPIC,
  ADD_NEW_TOPIC_SUCCESS,
  ADD_NEW_TOPIC_FAILURE,
  ADD_NEW_LESSON,
  ADD_NEW_LESSON_SUCCESS,
  ADD_NEW_LESSON_FAILURE,
  GET_LESSON,
  GET_LESSON_SUCCESS,
  GET_LESSON_FAILURE,
  GET_STUDENTS_FOR_LESSON,
  GET_STUDENTS_FOR_LESSON_SUCCESS,
  GET_STUDENTS_FOR_LESSON_FAILURE,
  ASSIGN_LESSON_TO_STUDENTS,
  ASSIGN_LESSON_TO_STUDENTS_SUCCESS,
  ASSIGN_LESSON_TO_STUDENTS_FAILURE,
  UNASSIGN_LESSON_TO_STUDENTS,
  UNASSIGN_LESSON_TO_STUDENTS_SUCCESS,
  UNASSIGN_LESSON_TO_STUDENTS_FAILURE,

} from './actionTypes'


export const getTeacherTopics = () => {
  return {
    type: GET_TEACHER_TOPICS,
  }
}

export const getTeacherTopicsSuccess = (data) => {
  return {
    type: GET_TEACHER_TOPICS_SUCCESS,
    payload: data
  }
}

export const getTeacherTopicsFailure = (error) => {
  return {
    type: GET_TEACHER_TOPICS_FAILURE,
    payload: error
  }
}

export const getTeacherTopicLessons = (id) => {
  return {
    type: GET_TEACHER_TOPIC_LESSONS,
    payload: id
  }
}

export const getTeacherTopicLessonsSuccess = (data) => {
  return {
    type: GET_TEACHER_TOPIC_LESSONS_SUCCESS,
    payload: data
  }
}

export const getTeacherTopicLessonsFailure = (error) => {
  return {
    type: GET_TEACHER_TOPIC_LESSONS_FAILURE,
    payload: error
  }
}

export const selectTopic = (id) => {
  return {
    type: SELECT_TOPIC,
    payload: id
  }
}

export const selectLesson = (id) => {
  return {
    type: SELECT_LESSON,
    payload: id
  }
}

export const getTeacherRecentLessons = () => {
  return {
    type: GET_TEACHER_RECENT_LESSONS,
  }
}

export const getTeacherRecentLessonsSuccess = (data) => {
  return {
    type: GET_TEACHER_RECENT_LESSONS_SUCCESS,
    payload: data
  }
}

export const getTeacherRecentLessonsFailure = (error) => {
  return {
    type: GET_TEACHER_RECENT_LESSONS_FAILURE,
    payload: error
  }
}

export const addNewTopic = ({ title, description, file }) => {
  return {
    type: ADD_NEW_TOPIC,
    payload: { title, description, file }
  }
}

export const addNewTopicSuccess = (data) => {
  return {
    type: ADD_NEW_TOPIC_SUCCESS,
    payload: data
  }
}

export const addNewTopicFailure = (error) => {
  return {
    type: ADD_NEW_TOPIC_FAILURE,
    payload: error
  }
}

export const addNewLesson = (data) => {
  return {
    type: ADD_NEW_LESSON,
    payload: data
  }
}

export const addNewLessonSuccess = (data) => {
  return {
    type: ADD_NEW_LESSON_SUCCESS,
    payload: data
  }
}

export const addNewLessonFailure = (error) => {
  return {
    type: ADD_NEW_LESSON_FAILURE,
    payload: error
  }
}

export const getLesson = (id) => {
  return {
    type: GET_LESSON,
    payload: id
  }
}

export const getLessonSuccess = (data) => {
  return {
    type: GET_LESSON_SUCCESS,
    payload: data
  }
}

export const getLessonFailure = (error) => {
  return {
    type: GET_LESSON_FAILURE,
    payload: error
  }
}

export const getStudentsForLesson = () => {
  return {
    type: GET_STUDENTS_FOR_LESSON,
  }
}

export const getStudentsForLessonSuccess = (data) => {
  return {
    type: GET_STUDENTS_FOR_LESSON_SUCCESS,
    payload: data
  }
}

export const getStudentsForLessonFailure = (error) => {
  return {
    type: GET_STUDENTS_FOR_LESSON_FAILURE,
    payload: error
  }
}

export const assignLessonToStudents = (data) => {
  return {
    type: ASSIGN_LESSON_TO_STUDENTS,
    payload: data
  }
}

export const assignLessonToStudentsSuccess = (data) => {
  return {
    type: ASSIGN_LESSON_TO_STUDENTS_SUCCESS,
    payload: data
  }
}

export const assignLessonToStudentsFailure = (error) => {
  return {
    type: ASSIGN_LESSON_TO_STUDENTS_FAILURE,
    payload: error
  }
}

export const unassignLessonToStudents = (data) => {
  return {
    type: UNASSIGN_LESSON_TO_STUDENTS,
    payload: data
  }
}

export const unassignLessonToStudentsSuccess = (data) => {
  return {
    type: UNASSIGN_LESSON_TO_STUDENTS_SUCCESS,
    payload: data
  }
}

export const unassignLessonToStudentsFailure = (error) => {
  return {
    type: UNASSIGN_LESSON_TO_STUDENTS_FAILURE,
    payload: error
  }
}
