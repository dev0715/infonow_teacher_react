



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
  GET_STUDENTS_FOR_LESSON_FAILURE,
  GET_STUDENTS_FOR_LESSON_SUCCESS,
  ASSIGN_LESSON_TO_STUDENTS,
  ASSIGN_LESSON_TO_STUDENTS_SUCCESS,
  ASSIGN_LESSON_TO_STUDENTS_FAILURE,
  UNASSIGN_LESSON_TO_STUDENTS,
  UNASSIGN_LESSON_TO_STUDENTS_SUCCESS,
  UNASSIGN_LESSON_TO_STUDENTS_FAILURE,
  DELETE_TOPIC,
  DELETE_TOPIC_SUCCESS,
  DELETE_TOPIC_FAILURE,
  DELETE_LESSON,
  DELETE_LESSON_SUCCESS,
  DELETE_LESSON_FAILURE,

} from './actionTypes'

const initialState = {
  topics: [],
  topicsLoading: false,
  topicsError: null,
  recentLessons: [],
  recentLessonsLoading: false,
  recentLessonsError: null,
  lessons: [],
  lessonsLoading: false,
  lessonsError: null,
  selectedTopic: null,
  selectedLesson: null,
  newTopicUploading: false,
  newTopicError: null,
  newLessonUploading: false,
  newLessonError: null,
  oneLessonLoading: false,
  oneLessonError: null,
  students: [],
  studentsError: null,
  studentsLoading: false,
  studentsLessonAssignLoading: false,
  studentsLessonAssignError: null,
  studentsLessonUnassignLoading: false,
  studentsLessonUnassignError: null,
  topicDeleting: false,
  topicDeleteError: null,
  lessonDeleting: false,
  lessonDeleteError: null
}




const teacherLessonReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_TEACHER_TOPICS:
      return { ...state, topics: [], topicsLoading: true }

    case GET_TEACHER_TOPICS_SUCCESS:
      return { ...state, topics: action.payload, topicsLoading: false, topicsError: null }

    case GET_TEACHER_TOPICS_FAILURE:
      return { ...state, topics: [], topicsLoading: false, topicsError: action.payload }

    case GET_TEACHER_TOPIC_LESSONS:
      return { ...state, lessons: [], lessonsLoading: true }

    case GET_TEACHER_TOPIC_LESSONS_SUCCESS:
      return { ...state, lessons: action.payload, lessonsLoading: false, lessonsError: null }

    case GET_TEACHER_TOPIC_LESSONS_FAILURE:
      return { ...state, lessons: [], lessonsLoading: false, lessonsError: action.payload }

    case GET_TEACHER_RECENT_LESSONS:
      return { ...state, recentLessons: [], recentLessonsLoading: true }

    case GET_TEACHER_RECENT_LESSONS_SUCCESS:
      return { ...state, recentLessons: action.payload, recentLessonsLoading: false, recentLessonsError: null }

    case GET_TEACHER_RECENT_LESSONS_FAILURE:
      return { ...state, recentLessons: [], recentLessonsLoading: false, recentLessonsError: action.payload }

    case SELECT_TOPIC:
      return { ...state, selectedTopic: action.payload, lessons: [], selectedLesson: null }

    case SELECT_LESSON:
      return { ...state, selectedLesson: action.payload }

    case ADD_NEW_TOPIC:
      return { ...state, newTopicUploading: true }

    case ADD_NEW_TOPIC_SUCCESS:
      return { ...state, topics: [...state.topics, action.payload], newTopicUploading: false, newTopicError: null }

    case ADD_NEW_TOPIC_FAILURE:
      return { ...state, newTopicUploading: false, newTopicError: action.payload }

    case ADD_NEW_LESSON:
      return { ...state, newLessonUploading: true }

    case ADD_NEW_LESSON_SUCCESS:
      return { ...state, lessons: [...state.lessons, action.payload], newLessonUploading: false, newLessonError: null }

    case ADD_NEW_LESSON_FAILURE:
      return { ...state, newLessonUploading: false, newLessonError: action.payload }

    case GET_LESSON:
      return { ...state, oneLessonLoading: true }

    case GET_LESSON_SUCCESS:
      for (const index in state.lessons) {
        if (state.lessons[index].id === action.payload.id) {
          state.lessons[index] = action.payload
          state.lessons[index].isFull = true
          break
        }
      }
      return { ...state, oneLessonLoading: false, oneLessonError: null }

    case GET_LESSON_FAILURE:
      return { ...state, oneLessonLoading: false, oneLessonError: action.payload }

    case GET_STUDENTS_FOR_LESSON:
      return { ...state, students: [], studentsLoading: true }

    case GET_STUDENTS_FOR_LESSON_SUCCESS:
      return { ...state, students: action.payload, studentsLoading: false, studentsError: null }

    case GET_STUDENTS_FOR_LESSON_FAILURE:
      return { ...state, studentsLoading: false, studentsError: action.payload }

    case ASSIGN_LESSON_TO_STUDENTS:
      return { ...state, studentsLessonAssignLoading: true }

    case ASSIGN_LESSON_TO_STUDENTS_SUCCESS:
      for (const index in state.lessons) {
        if (state.lessons[index].id === state.selectedLesson) {
          state.lessons[index].studentLessons = action.payload
          break;
        }
      }
      return { ...state, studentsLessonAssignLoading: false, studentsLessonAssignError: null }

    case ASSIGN_LESSON_TO_STUDENTS_FAILURE:
      return { ...state, studentsLessonAssignLoading: false, studentsLessonAssignError: action.payload }

    case UNASSIGN_LESSON_TO_STUDENTS:
      return { ...state, studentsLessonUnassignLoading: true }

    case UNASSIGN_LESSON_TO_STUDENTS_SUCCESS:
      for (const index in state.lessons) {
        if (state.lessons[index].id === state.selectedLesson) {
          state.lessons[index].studentLessons = action.payload
          break;
        }
      }
      return { ...state, studentsLessonUnassignLoading: false, studentsLessonUnassignError: null }

    case UNASSIGN_LESSON_TO_STUDENTS_FAILURE:
      return { ...state, studentsLessonUnassignLoading: false, studentsLessonUnassignError: action.payload }

    case DELETE_TOPIC:
      return { ...state, topicDeleting: true }

    case DELETE_TOPIC_SUCCESS:
      return {
        ...state,
        topics: state.topics.filter(t => t.id != action.payload),
        recentLessons: state.recentLessons.filter(l => l.topic.id != action.payload),
        topicDeleting: false, topicDeleteError: null
      }

    case DELETE_TOPIC_FAILURE:
      return { ...state, topicDeleting: false, topicDeleteError: action.payload }

    case DELETE_LESSON:
      return { ...state, lessonDeleting: true }

    case DELETE_LESSON_SUCCESS:
      return {
        ...state,
        lessons: state.lessons.filter(l => l.id != action.payload),
        recentLessons: state.recentLessons.filter(l => l.id != action.payload),
        lessonDeleting: false, lessonsError: null
      }

    case DELETE_LESSON_FAILURE:
      return { ...state, lessonDeleting: false, lessonDeleteError: action.payload }

    default:
      return state
  }
}

export default teacherLessonReducer
