
import {
    GET_STUDENTS,
    GET_STUDENTS_SUCCESS,
    GET_STUDENTS_FAILURE,
    GET_STUDENT_BY_ID,
    GET_STUDENT_BY_ID_SUCCESS,
    GET_STUDENT_BY_ID_FAILURE,
} from './actionTypes'

export const getAllStudents = () => {
    return {
        type: GET_STUDENTS
    }
}

export const getStudentsSuccess = (students) => {
    return {
        type: GET_STUDENTS_SUCCESS,
        payload: students
    }
}

export const getStudentsFailure = (error) => {
    return {
        type: GET_STUDENTS_FAILURE,
        payload: error
    }
}

export const getStudentById = (studentId) => {
    return {
        type: GET_STUDENT_BY_ID,
        payload: studentId
    }
}

export const getStudentByIdSuccess = (student) => {
    return {
        type: GET_STUDENT_BY_ID_SUCCESS,
        payload: student
    }
}


export const getStudentByIdFailure = (error) => {
    return {
        type: GET_STUDENT_BY_ID_FAILURE,
        payload: error
    }
}


