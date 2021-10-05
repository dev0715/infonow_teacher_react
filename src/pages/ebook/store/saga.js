import { call, put, takeEvery } from "redux-saga/effects"
import { GET_EBOOKS , POST_EBOOK , PUT_EBOOK} from './actionTypes'
import  {getEbooksSuccess , getEbooksFailure,
            postEbookSuccess,postEbookFailure ,
          putEbookSuccess, putEbookFailure} from './actions'

import { getEbooks } from '../../../helpers/backend-helpers'

function* getEbooksHttp(){
    try {
        const response = yield call(getEbooks);
        if (response) {
          yield put(getEbooksSuccess(response))
          return;
        }
        throw "Unknown response received from Server";
    
      } catch (error) {
        yield put(getEbooksFailure(error))
      }
}








function* EbookSaga() {
    yield takeEvery(GET_EBOOKS, getEbooksHttp)
  }
  
  export default EbookSaga
  