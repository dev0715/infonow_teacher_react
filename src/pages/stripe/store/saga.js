import { call, put, takeEvery } from "redux-saga/effects"

import {
    GET_STRIPE_PUBLIC_KEY,
    GET_PAYMENT_METHODS,
    POST_PAYMENT_METHODS,
    GET_PAYMENT_PLAN,
    SET_DEFAULT_PAYMENT_METHOD,
    POST_PAYMENT,

} from "./actionTypes"
import {
    getStripePublicKeySuccess, getStripePublicKeyFailure,
    getPaymentMethodsSuccess, getPaymentMethodsFailure,
    postPaymentMethodsSuccess, postPaymentMethodsFailure,
    getPaymentPlanSuccess, getPaymentPlanFailure,
    setDefaultPaymentMethodSuccess, setDefaultPaymentMethodFailure,
    postPaymentSuccess, postPaymentFailure
} from "./actions"
import {
    getStripeKey, getPaymentMethods, postPaymentMethods,
    getPaymentPlan, putPaymentMethods, postPayment
} from '@helpers/backend-helpers'



function* getStripePublicKeyHttp() {
    try {
        const response = yield call(getStripeKey);
        yield put(getStripePublicKeySuccess(response))
    } catch (error) {
        yield put(getStripePublicKeyFailure(error))
    }
}

function* getPaymentMethodsHttp() {
    try {
        const response = yield call(getPaymentMethods);
        yield put(getPaymentMethodsSuccess(response))
    } catch (error) {
        yield put(getPaymentMethodsFailure(error))
    }
}


function* postPaymentMethodHttp({ payload: data }) {
    try {

        const response = yield call(postPaymentMethods, { "token": data });
        yield put(postPaymentMethodsSuccess(response))
    } catch (error) {
        yield put(postPaymentMethodsFailure(error))
    }
}

function* getPaymentPlanHttp() {
    try {
        const response = yield call(getPaymentPlan);
        yield put(getPaymentPlanSuccess(response))
    } catch (error) {
        yield put(getPaymentPlanFailure(error))
    }
}

function* setDefaultPaymentMethodHttp({payload:data}) {
    try {
        const response = yield call(putPaymentMethods,data);
        yield put(setDefaultPaymentMethodSuccess(response))
    } catch (error) {
        yield put(setDefaultPaymentMethodFailure(error))
    }
}

function* postPaymentHttp({payload:data}) {
    try {
        const response = yield call(postPayment,data);
        yield put(postPaymentSuccess(response))
    } catch (error) {
        yield put(postPaymentFailure(error))
    }
}


function* StripeSaga() {
    yield takeEvery(GET_STRIPE_PUBLIC_KEY, getStripePublicKeyHttp)
    yield takeEvery(GET_PAYMENT_METHODS, getPaymentMethodsHttp)
    yield takeEvery(POST_PAYMENT_METHODS, postPaymentMethodHttp)
    yield takeEvery(GET_PAYMENT_PLAN, getPaymentPlanHttp)
    yield takeEvery(SET_DEFAULT_PAYMENT_METHOD, setDefaultPaymentMethodHttp)
    yield takeEvery(POST_PAYMENT, postPaymentHttp)
}

export default StripeSaga
