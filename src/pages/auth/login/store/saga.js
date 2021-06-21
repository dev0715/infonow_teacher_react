import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { loginError, loginSuccess } from "./actions"

//Include Both Helper File with needed methods
import { postStudentLogin } from "../../../../helpers/backend-helpers";
import { resetAPIAuthToken } from "../../../../helpers/api_helper";


function* loginUser({ payload: { user, history } }) {
    try {
        const response = yield call(postStudentLogin, user);
        if (response.user) {
            response.user = { ...response.user, userType: user.userType }
            localStorage.setItem("authUser", JSON.stringify(response))
            yield put(loginSuccess(response))
            return;
        }
        throw "Unknown response received from Server";

    } catch (error) {
        yield put(loginError(error))
    }
}

function* logoutUser({ payload: { history } }) {
    try {
        localStorage.removeItem("authUser")
        localStorage.removeItem("adminUser")
        resetAPIAuthToken();
        history.push("/login")
    } catch (error) {
        yield put(loginError(error))
    }
}

function* LoginSaga() {
    yield takeEvery(LOGIN_USER, loginUser)
    yield takeEvery(LOGOUT_USER, logoutUser)
}

export default LoginSaga
