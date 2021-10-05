import {
    GET_EBOOKS,
    GET_EBOOKS_SUCCESS,
    GET_EBOOKS_FAILURE,

    PUT_EBOOK_FAILURE,

} from './actionTypes'

const initialState = {
    ebooks: [],
    ebooksError: null,
    ebooksLoading: false

}

const EbookReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EBOOKS:
            return { ...state, ebooksLoading: true }
        case GET_EBOOKS_SUCCESS:
            return { ...state, ebooksLoading: false, ebooks: action.payload }
        case GET_EBOOKS_FAILURE:
            return { ...state, ebooksLoading: false, ebooksError: action.payload }

        default:
            return state
    }
}

export default EbookReducer