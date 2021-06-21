import {
    GET_ALL_MEETINGS,
    GET_ALL_MEETINGS_SUCCESS,
    GET_ALL_MEETINGS_ERROR
} from "./actionTypes"

export const getAllMeetings = () => {
    return {
        type: GET_ALL_MEETINGS,
    }
}

export const getAllMeetingsSuccess = meetings => {
    return {
        type: GET_ALL_MEETINGS_SUCCESS,
        payload: meetings,
    }
}

export const getAllMeetingsError = error => {
    return {
        type: GET_ALL_MEETINGS_ERROR,
        payload: error,
    }
}


