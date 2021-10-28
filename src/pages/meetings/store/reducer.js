import {
    GET_ALL_MEETINGS,
    GET_ALL_MEETINGS_SUCCESS,
    GET_ALL_MEETINGS_ERROR,
    
    GET_MEETING_DATES,
    GET_MEETING_DATES_SUCCESS,
    GET_MEETING_DATES_FAILURE,

    NEW_MEETING,
    NEW_MEETING_FAILURE,
    NEW_MEETING_SUCCESS,

    UPDATE_MEETING,
    UPDATE_MEETING_SUCCESS,
    UPDATE_MEETING_FAILURE,

    GET_STUDENTS_FOR_MEETING,
    GET_STUDENTS_FOR_MEETING_SUCCESS,
    GET_STUDENTS_FOR_MEETING_FAILURE,

    GET_MEETING_TOKEN,
    GET_MEETING_TOKEN_SUCCESS,
    GET_MEETING_TOKEN_FAILURE,

} from './actionTypes'

const initialState = {
    meetingsCount:null,
    meetings: [],
    meetingsLoading: false,
    meetingsError: null,
    meetingsDates: [],
    meetingsDatesLoading: false,
    meetingsDatesError: null,
    newMeetingLoading: false,
    newMeetingError: null,
    students: [],
    studentLoading: false,
    studentsError: null,
    meetingToken: null,
    meetingTokenLoading: false,
    meetingTokenError: null
}


const updateMeeting = (state, payload) => {
    for (let meetingIndex in state.meetings) {
        if (state.meetings[meetingIndex].meetingId === payload.id) {
            state.meetings[meetingIndex].loading = true;
            break;
        }
    }
    return {
        ...state,
        meetings: [...state.meetings]
    }
}

const updateMeetingSuccess = (state, payload) => {

    for (let meetingIndex in state.meetings) {
        if (state.meetings[meetingIndex].meetingId === payload.id) {
            state.meetings[meetingIndex] = payload.data;
            break;
        }
    }
    return {
        ...state,
        meetings: [...state.meetings]
    }
}

const updateMeetingFailure = (state, payload) => {

    for (let meetingIndex in state.meetings) {
        if (state.meetings[meetingIndex].meetingId === payload.id) {
            state.meetings[meetingIndex] = {
                ...state.meetings[meetingIndex],
                loading: false,
                error: payload.error
            };
            break;
        }
    }

    return {
        ...state,
        meetings: [...state.meetings]
    };
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
                meetings: action.payload.data,
                meetingsCount: action.payload.count,
                meetingsLoading: false,
                meetingsError: null,
            }
            break;
        case GET_ALL_MEETINGS_ERROR:
            state = {
                ...state,
                meetingsLoading: false,
                meetingsError: action.payload,
            }
            break;
        case GET_MEETING_DATES:
            state = {
                ...state,
                meetingsDatesLoading: true,
                meetingsDates: [],
                meetingsDatesError: null
            }
            break;
        case GET_MEETING_DATES_SUCCESS:
            state = {
                ...state,
                meetingsDatesLoading: false,
                meetingsDates: action.payload,
                meetingsDatesError: null
            }
            break;
        case GET_MEETING_DATES_FAILURE:
            state = {
                ...state,
                meetingsDatesLoading: false,
                meetingsDates: [],
                meetingsDatesError: action.payload
            }
            break;
        case NEW_MEETING:
            state = {
                ...state,
                newMeetingLoading: true,
                newMeetingError: null
            }
            break;
        case NEW_MEETING_FAILURE:
            state = {
                ...state,
                newMeetingLoading: false,
                newMeetingError: action.payload
            }
            break;
        case NEW_MEETING_SUCCESS:
            state = {
                ...state,
                newMeetingLoading: false,
                meetings: [...state.meetings, action.payload],
                meetingsDatesError: null
            }
            break;
        case UPDATE_MEETING:
            state = updateMeeting(state, action.payload)
            break;
        case UPDATE_MEETING_SUCCESS:
            state = updateMeetingSuccess(state, action.payload)
            break;
        case UPDATE_MEETING_FAILURE:
            state = updateMeetingFailure(state, action.payload)
            break;
        case GET_STUDENTS_FOR_MEETING:
            state = {
                ...state,
                students: [],
                studentLoading: true
            }
            break;
        case GET_STUDENTS_FOR_MEETING_SUCCESS:
            state = {
                ...state,
                students: action.payload,
                studentLoading: false
            }
            break;
        case GET_STUDENTS_FOR_MEETING_FAILURE:
            state = {
                ...state,
                students: [],
                studentLoading: false,
                studentsError: action.payload
            }
            break;

        case GET_MEETING_TOKEN:
            state = {
                ...state,
                meetingTokenLoading: true,
                meetingTokenError: null
            }
            break;

        case GET_MEETING_TOKEN_SUCCESS:
            state = {
                ...state,
                meetingToken: action.payload,
                meetingTokenLoading: false,
                meetingTokenError: null
            }
            break;

        case GET_MEETING_TOKEN_FAILURE:
            state = {
                ...state,
                meetingToken: null,
                meetingTokenLoading: false,
                meetingTokenError: action.payload
            }
            break;

        default:
            state = { ...state }
    }
    return state;
}
