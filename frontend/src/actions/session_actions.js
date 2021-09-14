import * as SessionApiUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_USER_SIGN_IN = 'RECEIVE_USER_SIGN_IN';

export const receiveCurrentUser = currentUSer => ({
    type: RECEIVE_CURRENT_USER,
    currentUSer
})

export const receiveUserSignIn = () => ({
    type: RECEIVE_USER_SIGN_IN
})

export const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const signup = user => dispatch => {
    debugger
    return (
        SessionApiUtil.signup(user).then(() => 
            dispatch(receiveUserSignIn())
        ), err => (
            dispatch(receiveSessionErrors(err.response.data))
        )
    )
}

export const login = user => dispatch => {
    debugger
    return (
        SessionApiUtil.login(user).then(res => {
            const {token} = res.data;
            localStorage.setItem('jwtToken', token);
            SessionApiUtil.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveCurrentUser(decoded))
        })
        .catch(err => {
            dispatch(receiveSessionErrors(err.response.data))
        })
    )
}


export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    SessionApiUtil.setAuthToken(false)
    dispatch(logoutUser())
}