import {
    GET_ALL_MEETINGS,
    GET_ALL_MEETINGS_SUCCESS,
    GET_ALL_MEETINGS_ERROR,
} from './actionTypes'

const initialState = {
    meetings: [],
    meetingsLoading: false,
    meetingsError: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_MEETINGS:
            state = {
                ...state,
                meetingsLoading: true,
                meetingsError: null
            }
            break;
        case GET_ALL_MEETINGS_SUCCESS:
            state = {
                ...state,
                meetings: action.payload,
                meetingsLoading: false,
                meetingsError: null,
            }
        case GET_ALL_MEETINGS_ERROR:
            state = {
                ...state,
                meetingsLoading: false,
                meetingsError: action.payload,
            }
        default:
            state = {...state}
    }
    return state;
}
