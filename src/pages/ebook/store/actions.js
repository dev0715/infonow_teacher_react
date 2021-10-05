import {

    GET_EBOOKS,
    GET_EBOOKS_SUCCESS,
    GET_EBOOKS_FAILURE,

} from './actionTypes'


export const getEbooks = () => {
    return {
        type: GET_EBOOKS
    }
}

export const getEbooksSuccess = (data) => {
    return {
        type: GET_EBOOKS_SUCCESS,
        payload: data
    }
}

export const getEbooksFailure = (data) => {
    return {
        type: GET_EBOOKS_FAILURE,
        payload: data
    }
}
